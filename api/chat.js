import OpenAI from 'openai';
import { withIronSessionApiRoute } from 'iron-session/next';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'andrew_ai_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 // 24 hours
  }
};

async function chatRoute(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Initialize or get query count from session
  req.session.queryCount = req.session.queryCount || 0;

  // Check query limit
  if (req.session.queryCount >= 5) {
    return res.status(429).json({
      error: 'Query limit reached',
      message: 'You have reached the query limit for this session.'
    });
  }

  try {
    const { query, context, systemPrompt, staticContext } = req.body;
    
    // Increment query count before making the request
    req.session.queryCount += 1;
    await req.session.save();
    
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.2,
      max_tokens: 200,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const response = completion.choices[0].message.content;
    
    res.json({
      response,
      queryCount: req.session.queryCount
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({
      error: 'API Error',
      message: 'Failed to process your request.'
    });
  }
}

export default withIronSessionApiRoute(chatRoute, sessionOptions); 