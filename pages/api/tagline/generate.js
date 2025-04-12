import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative tagline generator. Create a short, punchy tagline that starts with 'liebchen.world is' followed by 3-5 words that capture the essence of the given text. Add a touch of humor or wit. The tagline should be engaging and memorable. Do not use ellipsis, quotes, periods, or add any additional text. Never end the tagline with a period. Use lowercase only."
        },
        {
          role: "user",
          content: content
        }
      ],
      temperature: 0.7,
      max_tokens: 20,
    });

    // Remove any quotes, periods, convert to lowercase, and ensure it starts with "liebchen.world is"
    let tagline = completion.choices[0].message.content.trim()
      .replace(/["']/g, '')
      .replace(/\.$/, '')
      .toLowerCase();
    
    if (!tagline.startsWith('liebchen.world is')) {
      tagline = 'liebchen.world is ' + tagline;
    }
    res.status(200).json({ tagline });
  } catch (error) {
    console.error('Error generating tagline:', error);
    res.status(500).json({ error: 'Failed to generate tagline' });
  }
} 