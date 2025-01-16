const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const session = require('express-session');

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware to check query limit
const checkQueryLimit = (req, res, next) => {
  const session = req.session;
  session.queryCount = session.queryCount || 0;
  
  if (session.queryCount >= 5) {
    return res.status(429).json({
      error: 'Query limit reached',
      message: 'You have reached the query limit for this session.'
    });
  }
  next();
};

app.post('/api/chat', checkQueryLimit, async (req, res) => {
  try {
    const { query, context } = req.body;
    
    // Increment query count before making the request
    req.session.queryCount += 1;
    
    const messages = [
      { role: 'system', content: req.body.systemPrompt },
      { role: 'system', content: req.body.staticContext }
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
});

// Endpoint to get current query count
app.get('/api/queries/count', (req, res) => {
  res.json({ queryCount: req.session.queryCount || 0 });
});

// Endpoint to reset query count (optional, for development)
app.post('/api/queries/reset', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    req.session.queryCount = 0;
    res.json({ message: 'Query count reset' });
  } else {
    res.status(403).json({ error: 'Not allowed in production' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 