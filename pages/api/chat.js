import Anthropic, { RateLimitError } from '@anthropic-ai/sdk';
import { withIronSessionApiRoute } from 'iron-session/next';
import { CLAUDE_CONFIG, CHAT_RESPONSE_SCHEMA, SESSION_CONFIG, isAIEnabled, shouldEnforceQueryLimits, CONTACT_INFO } from '../../src/ai/config/claude';
import { track } from '@vercel/analytics/server';

// Wrap track in a safe function that won't throw
const safeTrack = async (eventName, properties) => {
  try {
    await track(eventName, properties);
    console.log(`Successfully tracked event: ${eventName}`, properties);
  } catch (error) {
    console.error(`Analytics tracking failed for event: ${eventName}`, {
      error: error.message,
      properties,
      stack: error.stack
    });
  }
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAINTENANCE_MODE_RESPONSES = [
  "I'm currently in maintenance mode, but you can still:",
  "While I'm being upgraded, feel free to:",
  "I'm taking a brief break to recharge, but you can:",
  "My AI features are temporarily paused, but you can still:"
];

const getMaintenanceResponse = () => {
  const randomIntro = MAINTENANCE_MODE_RESPONSES[Math.floor(Math.random() * MAINTENANCE_MODE_RESPONSES.length)];
  return {
    response: `${randomIntro}\n\n` +
              `→ Browse my portfolio with the **portfolio** command\n` +
              `→ Learn about my experience with **about**\n` +
              `→ Connect on LinkedIn: [${CONTACT_INFO.LINKEDIN_LINK}](${CONTACT_INFO.LINKEDIN_LINK})`
  };
};

const getTextBlock = (completion) => {
  const textBlock = completion.content?.find((block) => block.type === 'text');
  return textBlock?.text;
};

async function chatRoute(req, res) {
  console.log('API: Starting chat route');
  console.log('API: Session ID:', req.session.id);
  console.log('API: Initial query count:', req.session.queryCount);

  // Ensure proper method
  if (req.method !== 'POST') {
    console.log('API: Invalid method:', req.method);
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  // Check if AI is enabled
  if (!isAIEnabled()) {
    console.log('API: AI is disabled, returning maintenance response');
    return res.json(getMaintenanceResponse());
  }

  // Validate request body
  const { query, context, systemPrompt, staticContext } = req.body;
  if (!query || !systemPrompt || !staticContext) {
    console.log('API: Missing required fields:', { query, systemPrompt, staticContext });
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields in request body'
    });
  }

  try {
    // Initialize query count if not exists
    if (typeof req.session.queryCount === 'undefined') {
      console.log('API: Initializing query count');
      req.session.queryCount = 0;
    }

    console.log('API: Current query count:', req.session.queryCount);

    // Check query limit only in production
    if (shouldEnforceQueryLimits() && req.session.queryCount >= 5) {
      console.log('API: Query limit reached');
      return res.status(429).json({
        error: 'Query limit reached',
        message: 'You\'ve reached the query limit. Your session will reset in 6 hours.'
      });
    }

    const systemParts = [systemPrompt, staticContext];

    if (context?.inCaseStudy && context?.currentCaseStudy) {
      systemParts.push(`Current context: User is viewing the ${context.currentCaseStudy} case study.`);
    }

    console.log('API: Making Claude request');
    const completion = await anthropic.messages.create({
      ...CLAUDE_CONFIG,
      system: systemParts.join('\n\n'),
      messages: [{ role: 'user', content: query }],
      output_config: {
        format: {
          type: 'json_schema',
          schema: CHAT_RESPONSE_SCHEMA
        }
      }
    });

    const rawContent = getTextBlock(completion);
    if (!rawContent) {
      console.log('API: Invalid Claude response');
      throw new Error('Invalid response from Claude');
    }

    // Log the raw response for debugging
    console.log('API: Raw Claude response:', rawContent);

    let response;
    try {
      response = JSON.parse(rawContent);
    } catch (error) {
      console.error('API: Failed to parse JSON response:', error);
      console.error('API: Raw response that failed to parse:', rawContent);
      throw new Error('Invalid JSON response from Claude');
    }

    // Validate response structure
    if (!response.text || typeof response.text !== 'string') {
      console.error('API: Invalid response structure - missing or invalid text field');
      throw new Error('Invalid response structure from Claude');
    }

    if (response.caseStudy && typeof response.caseStudy !== 'string') {
      console.error('API: Invalid response structure - caseStudy must be a string');
      throw new Error('Invalid response structure from Claude');
    }
    
    // Track the AI interaction with safe tracking
    await safeTrack('ai_interaction', {
      query_count: req.session.queryCount,
      query_length: query.length,
      response_length: response.text.length,
      query_text: query,
      response_text: response.text,
      has_case_study: !!response.caseStudy
    });
    
    // Only increment query count after successful response
    req.session.queryCount += 1;
    console.log('API: Incrementing query count to:', req.session.queryCount);
    await req.session.save();
    console.log('API: Session saved');
    
    console.log('API: Sending successful response with query count:', req.session.queryCount);
    return res.json({
      response: response,
      queryCount: req.session.queryCount
    });

  } catch (error) {
    console.error('API Error:', error);
    console.log('API: Session state at error:', {
      queryCount: req.session.queryCount,
      sessionId: req.session.id
    });
    
    if (error.status === 429 || error instanceof RateLimitError) {
      return res.status(429).json({
        error: 'Rate Limit',
        message: 'Claude rate limit reached. Please try again later.'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'An error occurred while processing your request'
    });
  }
}

// Export the route with iron-session wrapper
export default withIronSessionApiRoute(chatRoute, SESSION_CONFIG);
