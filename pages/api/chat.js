import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { query, context, systemPrompt, staticContext, queryCount } = req.body;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: staticContext }
    ];

    // Add context from previous conversation if available
    if (context.currentCaseStudy) {
      messages.push({
        role: 'system',
        content: `Current context: User is viewing the case study "${context.currentCaseStudy}"`
      });
    }

    // Add the user's query
    messages.push({ role: 'user', content: query });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;

    res.status(200).json({
      response,
      queryCount: queryCount
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      message: error.message || 'An error occurred while processing your request'
    });
  }
} 