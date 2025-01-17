import OpenAI from 'openai';
import { withIronSessionApiRoute } from 'iron-session/next';
import { OPENAI_CONFIG, SESSION_CONFIG } from '../../config/openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Check query limit
    if (req.session.queryCount >= 5) {
      console.log('API: Query limit reached');
      return res.status(429).json({
        error: 'Query limit reached',
        message: 'You have reached the query limit for this session.'
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