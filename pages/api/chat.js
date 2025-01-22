import OpenAI from 'openai';
import { withIronSessionApiRoute } from 'iron-session/next';
import { OPENAI_CONFIG, SESSION_CONFIG, isAIEnabled, shouldEnforceQueryLimits, CALENDLY_LINK, EMAIL } from '../../src/ai/config/openai';
import { track } from '@vercel/analytics/next';

// Wrap track in a safe function that won't throw
const safeTrack = async (eventName, properties) => {
  try {
    await track(eventName, properties);
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
              '→ Browse my portfolio with the `portfolio` command\n' +
              '→ Learn about my experience with `about`\n' +
              '→ Schedule a call: ${CALENDLY_LINK}\n' +
              `→ Email me at ${EMAIL}`
  };
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
    
    // Prepare messages array
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: staticContext }
    ];

    if (context?.inCaseStudy && context?.currentCaseStudy) {
      messages.push({
        role: 'system',
        content: `Current context: User is viewing the ${context.currentCaseStudy} case study.`
      });
    }

    messages.push({ role: 'user', content: query });

    console.log('API: Making OpenAI request');
    // Make OpenAI API call
    const completion = await openai.chat.completions.create({
      messages,
      ...OPENAI_CONFIG
    });

    if (!completion.choices?.[0]?.message?.content) {
      console.log('API: Invalid OpenAI response');
      throw new Error('Invalid response from OpenAI');
    }

    const response = completion.choices[0].message.content;
    
    // Track the AI interaction with safe tracking
    await safeTrack('ai_interaction', {
      query_count: req.session.queryCount,
      query_length: query.length,
      response_length: response.length
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
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Rate Limit',
        message: 'OpenAI rate limit reached. Please try again later.'
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