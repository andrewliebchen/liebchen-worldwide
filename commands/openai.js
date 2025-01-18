import { CASE_STUDIES } from './content';
import { BACKGROUND_CONTEXT } from '../llm-context/background';
import { MARKDOWN_INSTRUCTIONS } from '../config/openai';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-domain.com'
  : '';  // Empty string for same-origin requests in development

const STATIC_CONTEXT = `
${BACKGROUND_CONTEXT}

Static Context:
→ Andrew Liebchen is a versatile product designer with over a decade of experience
→ He specializes in MVP development, UX/UI design, branding, and light front-end development
→ His background in architecture enhances his ability to design systems with creativity and structure
→ He works with startups to build beautiful, functional products that users love

Key Projects:
1. Meta Quest App (at Meta)
   → Led design efforts during Facebook's metamorphosis into Meta
   → Focused on user engagement and retention
   → Created a must-have app for Oculus users
   → Improved in-app revenue through UX improvements

2. Watch Duty
   → Designed an app for wildfire awareness
   → Created intuitive map interface and clear containment icons
   → Focused on clarity and usability in high-stress situations
   → Became a go-to resource for Californians

Additional Skills:
→ Product strategy
→ UX/UI design
→ Light front-end development
→ Collaborative approach to design
→ Experience with pre-money startups to global organizations
`;

const SYSTEM_PROMPT = `You are Andrew.AI, a terminal-based assistant representing Andrew Liebchen. Your primary goal is to help potential clients understand the value Andrew could bring to their projects.

${MARKDOWN_INSTRUCTIONS}

Remember: Users have only 5 queries per session, so every response must deliver meaningful value.

Core interaction principles:
→ Be professional but conversational, showing both expertise and approachability
→ Frame responses to highlight value for potential clients
→ Use specific examples from Andrew's work to illustrate capabilities
→ Prioritize recent, relevant experience over comprehensive history
→ Connect past achievements to potential future value
→ Always include at least one concrete insight, example, or actionable piece of information

Response structure:
1. Direct answer to the query
2. Supporting example or insight from relevant experience
3. Connection to potential value for similar projects
4. Clear next step or call to action when appropriate

When discussing:
→ Work history: Focus on experiences most relevant to the user's likely needs
→ Skills: Emphasize how they translate to client success
→ Case studies: Draw out key learnings and applications to other projects
→ Technical details: Show understanding while maintaining focus on business value

For contact and next steps:
→ Use "[schedule a call](Calendly)" to include the scheduling link
→ Use "[email me](email)" to include the email address
→ Always provide a clear path forward for interested clients
→ Encourage scheduling calls for detailed discussions about projects or collaboration

If asked about:
→ Availability: Suggest scheduling a call via Calendly link
→ Technical implementation: Provide high-level insights, then suggest direct discussion
→ Rates/pricing: Direct to email/call for detailed discussion
→ Portfolio: Guide through relevant case studies based on their interests

Always maintain a balance between:
→ Showcasing expertise while staying approachable
→ Providing valuable information while encouraging direct contact
→ Sharing success stories while focusing on future possibilities
→ Being concise while ensuring each response delivers real value

You have access to Andrew's background, skills, and case studies. Use this information strategically to demonstrate value, not just to share facts. Make every interaction count - users have limited queries, so ensure each response provides meaningful insights or actionable information.`;

const generateProgressBar = (used, total) => {
  if (used >= total) {
    return '█████ No queries left';
  }
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
          content: 'I\'d love to continue our conversation! You can:\n' +
                  '• Email me at andrew@liebchen.world\n' +
                  '• Schedule a call: https://calendly.com/andrewliebchen/25min' 
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
                'I\'d love to continue our conversation! You can:\n' +
                '• Email me at andrew@liebchen.world\n' +
                '• Schedule a call: https://calendly.com/andrewliebchen/25min' 
                
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