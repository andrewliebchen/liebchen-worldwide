import Anthropic from '@anthropic-ai/sdk';
import { CLAUDE_CONFIG } from '../../../src/ai/config/claude';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TAGLINE_SYSTEM_PROMPT = "You are a creative tagline generator. Create a very short, punchy tagline that starts with 'Liebchen.world is' followed by 3-5 words maximum that capture the essence of the given text. Keep it under 40 characters total. Add a touch of humor or wit. The tagline should be engaging and memorable. Do not use ellipsis, quotes, periods, or add any additional text. Never end the tagline with a period. Use lowercase only. Use emojis only to maximize impact or irony";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    const completion = await anthropic.messages.create({
      model: CLAUDE_CONFIG.model,
      max_tokens: 20,
      temperature: 0.7,
      system: TAGLINE_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: content
        }
      ]
    });

    const rawText = completion.content.find((block) => block.type === 'text')?.text || '';

    // Remove any quotes, periods, convert to lowercase, and ensure it starts with "liebchen.world is"
    let tagline = rawText.trim()
      .replace(/["']/g, '')
      .replace(/\.$/, '');
    
    if (!tagline.startsWith('Liebchen.world is')) {
      tagline = 'Liebchen.world is ' + tagline;
    }

    // Enforce max length of 50 characters
    if (tagline.length > 50) {
      tagline = tagline.substring(0, 47) + '...';
    }

    res.status(200).json({ tagline });
  } catch (error) {
    console.error('Error generating tagline:', error);
    res.status(500).json({ error: 'Failed to generate tagline' });
  }
}
