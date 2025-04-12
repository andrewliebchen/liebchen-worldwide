import { BACKGROUND_CONTEXT } from '@/src/ai/context/background';
import { CALENDLY_LINK, EMAIL, LINKEDIN_LINK, shouldEnforceQueryLimits } from '@/src/ai/config/openai';
import { CASE_STUDIES } from '@/src/ai/commands/content';
import { SYSTEM_PROMPT } from '@/src/ai/config/SYSTEM_PROMPT';

const API_URL = '';  // Empty string for relative URLs in all environments

const buildProjectsContext = () => {
  return Object.entries(CASE_STUDIES).map(([id, study]) => {
    return `${id}. ${study.title}
   → ${study.description}
   → Challenge: ${study.challenge}
   → Solution: ${study.solution}
   → Outcome: ${study.outcome}`;
  }).join('\n\n');
};

const STATIC_CONTEXT = `
${BACKGROUND_CONTEXT}

Static Context:
Andrew Liebchen is a senior product designer with over a decade of experience helping early teams turn ideas into thoughtful, usable, real-world products. His work spans UX design, product strategy, branding, and front-end development — always grounded in empathy and driven by clarity.

Originally trained as an architect, Andrew brings a systems mindset to digital design: he can zoom out to the big picture, or zoom in to make sure the corner radius feels just right. He's collaborated with everyone from pre-seed founders to global teams at Meta, and he's most at home working closely with engineers, PMs, and users to move fast and build meaningfully.

He specializes in:
→ MVP definition and early product strategy
→ UX/UI design that prioritizes clarity and momentum
→ Brand systems that grow with the product
→ Front-end implementation in React and React Native
→ Collaborative, high-trust partnerships

Key Projects:
${buildProjectsContext()}
`;


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
                  `→ Message me on LinkedIn: ${LINKEDIN_LINK}\n` +
                  `→ Schedule a call: ${CALENDLY_LINK}`
        };
      }
      throw new Error(error.message);
    }

    const data = await response.json();
    
    // If we got a maintenance mode response (no queryCount in response)
    if (!data.queryCount) {
      return {
        type: 'ai-response',
        content: data.response
      };
    }

    // Handle the new JSON response format
    const aiResponse = data.response;
    
    // Only show last query message in production
    if (shouldEnforceQueryLimits() && queryCount >= 4) {
      return {
        type: 'ai-response',
        content: `${aiResponse.text}\n\n` +
                '---\n\n' +
                'I\'d love to continue our conversation! You can:\n' +
                `→ Message me on LinkedIn: ${LINKEDIN_LINK}\n` +
                `→ Schedule a call: ${CALENDLY_LINK}`,
        caseStudy: aiResponse.caseStudy
      };
    }

    return {
      type: 'ai-response',
      content: aiResponse.text,
      caseStudy: aiResponse.caseStudy
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      type: 'error',
      content: 'Sorry, I couldn\'t process that. Type `help` for available commands.'
    };
  }
}; 