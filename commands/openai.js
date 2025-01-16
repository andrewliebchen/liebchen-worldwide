import { CASE_STUDIES } from './content';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-domain.com'
  : '';  // Empty string for same-origin requests in development

const STATIC_CONTEXT = `
Static Context:
- Andrew Liebchen is a versatile product designer with over a decade of experience.
- He specializes in MVP development, UX/UI design, branding, and light front-end development.
- His background in architecture enhances his ability to design systems with creativity and structure.
- He works with startups to build beautiful, functional products that users love.

Key Projects:
1. Meta Quest App (at Meta)
   - Led design efforts during Facebook's metamorphosis into Meta
   - Focused on user engagement and retention
   - Created a must-have app for Oculus users
   - Improved in-app revenue through UX improvements

2. Watch Duty
   - Designed an app for wildfire awareness
   - Created intuitive map interface and clear containment icons
   - Focused on clarity and usability in high-stress situations
   - Became a go-to resource for Californians

Additional Skills:
- Product strategy
- UX/UI design
- Light front-end development
- Collaborative approach to design
- Experience with pre-money startups to global organizations
`;

const SYSTEM_PROMPT = `You are Andrew.AI, a terminal-based assistant representing Andrew Liebchen. You help users learn about Andrew's work and experience through natural conversation. You should be professional but friendly, and always stay in character as an AI assistant. You have access to information about Andrew's background, skills, and case studies. When discussing case studies, be detailed but concise. If asked about technical implementation details, acknowledge your role as a portfolio interface and direct users to contact Andrew directly.`;

const generateProgressBar = (used, total) => {
  const filled = '█'.repeat(used);
  const empty = '░'.repeat(total - used);
  const remaining = total - used;
  return `${filled}${empty} ${remaining} ${remaining === 1 ? 'query' : 'queries'} left`;
};

export const generateResponse = async (query, currentContext = {}, queryCount = 0) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        context: currentContext,
        systemPrompt: SYSTEM_PROMPT,
        staticContext: STATIC_CONTEXT,
        queryCount: queryCount
      })
    });

    if (!response.ok) {
      const error = await response.json();
      if (response.status === 429) {
        return {
          type: 'error',
          content: 'You have reached the query limit for this session.\n\n' +
                  'I\'d love to continue our conversation! You can:\n' +
                  '• Email me at andrew@liebchen.world\n' +
                  '• Schedule a call: https://calendly.com/andrewliebchen/25min\n\n' +
                  'Or refresh the page to start a new session.'
        };
      }
      throw new Error(error.message);
    }

    const data = await response.json();
    const progressBar = generateProgressBar(queryCount + 1, 5);

    // If this is the last available query
    if (queryCount >= 4) {
      return {
        type: 'ai-response',
        content: `${data.response}\n\n${progressBar}\n\n` +
                '---\n\n' +
                'This was your final AI query for this session.\n' +
                'I\'d love to continue our conversation! You can:\n' +
                '• Email me at andrew@liebchen.world\n' +
                '• Schedule a call: https://calendly.com/andrewliebchen/25min\n\n' +
                'Or refresh the page to start a new session.'
      };
    }

    return {
      type: 'ai-response',
      content: `${data.response}\n\n${progressBar}`
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      type: 'error',
      content: 'Sorry, I couldn\'t process that. Type `help` for available commands.'
    };
  }
}; 