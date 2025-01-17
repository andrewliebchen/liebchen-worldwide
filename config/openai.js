// OpenAI API configuration
export const OPENAI_CONFIG = {
  model: 'gpt-4',
  temperature: 0.2,      // Lower temperature for more focused, consistent responses
  max_tokens: 500,       // Increased to allow for detailed responses
  presence_penalty: 0.1, // Slight penalty to avoid repetition
  frequency_penalty: 0.1 // Slight penalty to encourage varied language
};

// Contact information and common links
export const CONTACT_INFO = {
  calendly: {
    url: 'https://calendly.com/andrewliebchen/25min',
    text: 'schedule a call'
  },
  email: {
    url: 'mailto:andrewliebchen@gmail.com',
    text: 'email me'
  }
};

// Helper to format contact links in responses
export const formatContactLinks = (response) => {
  const links = [];
  
  if (response.toLowerCase().includes('calendly')) {
    links.push(`→ [${CONTACT_INFO.calendly.text}](${CONTACT_INFO.calendly.url})`);
  }
  if (response.toLowerCase().includes('email')) {
    links.push(`→ [${CONTACT_INFO.email.text}](${CONTACT_INFO.email.url})`);
  }
  
  return links.length > 0 ? `\n\n---\n${links.join('\n')}` : '';
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
`;

// Validate SESSION_SECRET and get password
const getSessionPassword = () => {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret && process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be set in production environment');
  }
  if (!sessionSecret && process.env.NODE_ENV !== 'development') {
    throw new Error('SESSION_SECRET not set');
  }
  return sessionSecret || "dev_secret_minimum_32_chars_long_for_iron_session";
};

// Iron Session configuration
export const SESSION_CONFIG = {
  cookieName: "andrew_ai_session",
  password: getSessionPassword(),
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 24 * 60 * 60
  }
}; 