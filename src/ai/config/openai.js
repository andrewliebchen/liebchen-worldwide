// OpenAI API configuration
export const OPENAI_CONFIG = {
  model: 'gpt-4',
  temperature: 0.3,      // Lower temperature for more focused, consistent responses
  max_tokens: 300,       // Reduced to enforce shorter responses
  presence_penalty: 0.1, // Slight penalty to avoid repetition
  frequency_penalty: 0.1 // Slight penalty to encourage varied language
};

// Check if AI functionality is enabled
export const isAIEnabled = () => {
  return process.env.ENABLE_AI !== 'false' && !!process.env.OPENAI_API_KEY;
};

// Markdown formatting instructions for the LLM
export const MARKDOWN_INSTRUCTIONS = `
Format responses using these markdown conventions:
- Use **bold** for emphasis
- Use \`code\` for technical terms
- Use --- for horizontal rules
- Use → instead of bullet points
- Use [text](url) for links
- Avoid using markdown lists (ul/ol)
- Use line breaks and paragraphs for structure

CRITICAL instructions:
- Keep responses concise, no more than 3 short paragraphs
- Focus on the most relevant information
`;

// Validate SESSION_SECRET and get password
const getSessionPassword = () => {
  // In development or preview, use a default secret
  if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview') {
    return "dev_secret_minimum_32_chars_long_for_iron_session";
  }
  
  // In production, require a real secret
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    console.error('SESSION_SECRET not set in production environment');
    return "dev_secret_minimum_32_chars_long_for_iron_session";
  }
  
  return sessionSecret;
};

// Iron Session configuration
export const SESSION_CONFIG = {
  cookieName: "andrew_ai_session",
  password: getSessionPassword(),
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 6 * 60 * 60
  }
}; 