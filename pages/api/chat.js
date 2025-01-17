import OpenAI from 'openai';
import { withIronSessionApiRoute } from 'iron-session/next';
import { OPENAI_CONFIG, SESSION_CONFIG, formatContactLinks } from '../../config/openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatRoute(req, res) {
  // Ensure proper method
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  // Validate request body
  const { query, context, systemPrompt, staticContext } = req.body;
  if (!query || !systemPrompt || !staticContext) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required fields in request body'
    });
  }

  try {
    // Initialize query count if not exists
    if (typeof req.session.queryCount === 'undefined') {
      req.session.queryCount = 0;
    }

    // Check query limit
    if (req.session.queryCount >= 5) {
      return res.status(429).json({
        error: 'Query limit reached',
        message: 'You have reached the query limit for this session.'
      });
    }
    
    // Increment query count before making the request
    req.session.queryCount += 1;
    await req.session.save();
    
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

    // Make OpenAI API call
    const completion = await openai.chat.completions.create({
      messages,
      ...OPENAI_CONFIG
    });

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const response = completion.choices[0].message.content;
    
    // Add contact links if relevant
    const formattedResponse = response + formatContactLinks(response);
    
    return res.json({
      response: formattedResponse,
      queryCount: req.session.queryCount
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
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