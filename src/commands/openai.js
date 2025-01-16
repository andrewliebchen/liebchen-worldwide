import { CASE_STUDIES } from './content';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are Andrew.AI, a terminal-based assistant representing Andrew Liebchen, a versatile product designer with over a decade of experience in consumer, enterprise, and data-driven product design. Andrew has worked with companies ranging from pre-money startups to global organizations like Meta, where he led design efforts for the Meta Quest app. He specializes in creating MVPs for startups, offering expertise in product strategy, UX/UI design, branding, and even light front-end development.

Key highlights of Andrew's career include:
- Designing apps like Watch Duty, a go-to resource for wildfire awareness
- Leading design on high-impact projects at Meta, focusing on user engagement and retention
- A background in architecture, enhancing his ability to design systems with both creativity and structure
- A collaborative approach to product design, working seamlessly with engineers, product managers, and stakeholders

Andrew is also a sculptor, an avid reader of fiction and long-form articles, and passionate about solving complex problems with pragmatic, human-centered solutions.

Your role is to provide concise, professional, and approachable responses to questions about Andrew's work, design philosophy, and processes. When relevant, incorporate Andrew's unique background and achievements into your answers to enrich the conversation.

Guidelines for responses:
1. Keep answers concise and focused
2. Use a professional but friendly tone
3. Reference relevant experience when applicable
4. Include specific examples from case studies when relevant
5. Maintain a terminal-appropriate format (avoid emojis or fancy formatting)`;

const MVP_CONTEXT = `
Andrew's MVP design philosophy emphasizes:
- Collaborative discovery to align product goals
- Iterative design processes focusing on user feedback
- Delivering polished prototypes that excite stakeholders and investors
- Balancing speed with quality to achieve maximum impact`;

const DESIGN_PROCESS_CONTEXT = `
Andrew's design process is built on:
- Deep user research and stakeholder interviews
- Rapid prototyping and iteration
- Close collaboration with engineering teams
- Data-driven decision making
- Focus on business goals while maintaining user-centricity`;

const getRelevantContext = (query) => {
  const lowerQuery = query.toLowerCase();
  const contextParts = [];

  // Add case study context
  Object.entries(CASE_STUDIES).forEach(([_, study]) => {
    if (lowerQuery.includes(study.title.toLowerCase()) || 
        lowerQuery.includes(study.title.split(':')[0].toLowerCase())) {
      contextParts.push(
        `Case Study Context - ${study.title}:
        ${study.description}
        Challenge: ${study.challenge}
        Solution: ${study.solution}
        Outcome: ${study.outcome}`
      );
    }
  });

  // Add MVP context if relevant
  if (lowerQuery.includes('mvp') || 
      lowerQuery.includes('startup') || 
      lowerQuery.includes('prototype')) {
    contextParts.push(MVP_CONTEXT);
  }

  // Add design process context if relevant
  if (lowerQuery.includes('process') || 
      lowerQuery.includes('approach') || 
      lowerQuery.includes('methodology') ||
      lowerQuery.includes('how do you')) {
    contextParts.push(DESIGN_PROCESS_CONTEXT);
  }

  return contextParts.join('\n\n');
};

export const generateResponse = async (query, currentContext = {}) => {
  try {
    const relevantContext = getRelevantContext(query);
    
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add dynamic context if available
    if (relevantContext) {
      messages.push({
        role: 'system',
        content: `Additional context for this query:\n${relevantContext}`
      });
    }

    // Add current conversation context if in a case study
    if (currentContext.inCaseStudy && currentContext.currentCaseStudy) {
      messages.push({
        role: 'system',
        content: `User is currently viewing the case study for: ${currentContext.currentCaseStudy}`
      });
    }

    // Add the user's query
    messages.push({ 
      role: 'user', 
      content: `User Query: ${query}\n\nProvide a concise, professional response that draws from the relevant context and experience.` 
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 300
    });

    return {
      type: 'ai-response',
      content: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      type: 'error',
      content: 'Sorry, I couldn\'t process that. Type `help` for available commands.'
    };
  }
}; 