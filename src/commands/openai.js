import { CASE_STUDIES } from './content';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Throttling configuration
let lastRequestTime = 0;
const THROTTLE_TIME = 5000; // 5 seconds

const canMakeRequest = () => {
  const now = Date.now();
  if (now - lastRequestTime >= THROTTLE_TIME) {
    lastRequestTime = now;
    return true;
  }
  return false;
};

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

const SYSTEM_PROMPT = `You are Andrew.AI, a terminal-based assistant representing Andrew Liebchen. Your responses must adhere to these strict guidelines:

1. ONLY use information from the provided static context
2. DO NOT invent or speculate about details not provided
3. If asked about something outside your knowledge, respond with: "I don't have specific information about that. Would you like to know about my experience with [relevant topic from context]?"
4. Keep responses concise and focused
5. Use a professional but approachable tone
6. Format responses in plain text, avoiding markdown or special formatting

Your role is to help users understand Andrew's work and expertise while maintaining complete accuracy.`;

const sanitizeResponse = (response) => {
  if (!response) return "An error occurred. Please try again.";
  
  const lowercaseResponse = response.toLowerCase();
  const speculativeWords = ['probably', 'might', 'maybe', 'i think', 'possibly', 'could be'];
  
  if (speculativeWords.some(word => lowercaseResponse.includes(word))) {
    return "I should stick to what I know for certain. Would you like to know about my experience with Meta Quest or Watch Duty?";
  }
  
  return response;
};

const generateProgressBar = (used, total) => {
  const filled = '█'.repeat(used);
  const empty = '░'.repeat(total - used);
  return `${filled}${empty} ${used}/${total} queries used`;
};

export const generateResponse = async (query, currentContext = {}, queryCount = 0) => {
  console.log('OpenAI: Generating response with queryCount:', queryCount);
  
  if (!canMakeRequest()) {
    console.log('OpenAI: Throttled, cannot make request yet');
    return {
      type: 'error',
      content: 'Please wait a few seconds before asking another question.'
    };
  }

  // If query limit reached, return contact message
  if (queryCount >= 5) {
    console.log('OpenAI: Query limit reached');
    return {
      type: 'error',
      content: 'You have reached the query limit for this session.\n\n' +
               'I\'d love to continue our conversation! You can:\n' +
               '• Email me at andrew@liebchen.world\n' +
               '• Schedule a call: https://calendly.com/andrewliebchen/25min.'
    };
  }

  try {
    console.log('OpenAI: Preparing messages for API call');
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: STATIC_CONTEXT }
    ];

    // Add current case study context if relevant
    if (currentContext.inCaseStudy && currentContext.currentCaseStudy) {
      console.log('OpenAI: Adding case study context:', currentContext.currentCaseStudy);
      const study = Object.values(CASE_STUDIES).find(s => s.title === currentContext.currentCaseStudy);
      if (study) {
        messages.push({
          role: 'system',
          content: `Current context: User is viewing the ${study.title} case study.`
        });
      }
    }

    messages.push({ 
      role: 'user', 
      content: query
    });

    console.log('OpenAI: Making API call');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.2,
      max_tokens: 200,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const response = sanitizeResponse(completion.choices[0].message.content);
    const progressBar = generateProgressBar(queryCount + 1, 5);
    console.log('OpenAI: Generated progress bar:', progressBar);

    // If this is the last available query (queryCount is 4, becoming 5 after this)
    if (queryCount >= 4) {
      return {
        type: 'ai-response',
        content: `${response}\n\n${progressBar}\n\n` +
                'This was your final AI query for this session.\n' +
                'I\'d love to continue our conversation! You can:\n' +
                '• Email me at andrew@liebchen.world\n' +
                '• Schedule a call: https://calendly.com/andrewliebchen/25min\n\n' +
                'Or refresh the page to start a new session.'
      };
    }

    return {
      type: 'ai-response',
      content: `${response}\n\n${progressBar}`
    };
  } catch (error) {
    console.error('OpenAI: API Error:', error);
    return {
      type: 'error',
      content: 'Sorry, I couldn\'t process that. Type `help` for available commands.'
    };
  }
}; 