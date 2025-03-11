import { CALENDLY_LINK, LINKEDIN_LINK } from '@/src/ai/config/openai';

export const CASE_STUDIES = {
  1: {
    title: 'Watch Duty: Wildfire Awareness',
    description: 'Worked closely with a founder and volunteers to design an app that provides timely wildfire updates.',
    challenge: 'Ensure clarity and usability under high-stress conditions.',
    solution: 'Intuitive map interface and clear containment icons.',
    outcome: 'Became a go-to resource for Californians navigating wildfire risks.',
    linkText: 'Project showcase →',
    link: 'https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%92%81%E2%80%8D%E2%99%82%EF%B8%8F-Portfolio-%E2%80%94-Feb-2025?node-id=197-14820&p=f&viewport=1123%2C263%2C0.17&t=NFL2SDKCCnSotTK3-0&scaling=min-zoom&scaling=scale-down-width&starting-point-node-id=197%3A14827&show-proto-sidebar=1'
  },
  2: {
    title: 'Meta Quest: Bridge to the Metaverse',
    description: 'I led the design for the Meta Quest app during Facebook\'s metamorphosis into Meta.',
    challenge: 'Create a must-have app for Oculus users while ramping up in-app revenue.',
    solution: 'A revamped landing page addressing user pain points and fostering social connections.',
    outcome: 'Boosted retention and engagement metrics significantly.',
    linkText: 'Project showcase →',
    link: 'https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%92%81%E2%80%8D%E2%99%82%EF%B8%8F-Portfolio-%E2%80%94-Feb-2025?node-id=197-14820&p=f&viewport=1123%2C263%2C0.17&t=NFL2SDKCCnSotTK3-0&scaling=min-zoom&scaling=scale-down-width&starting-point-node-id=197%3A14917&show-proto-sidebar=1'
  },
  3: {
    title: "Miri: AI-powered wellness coach",
    description: "Led the design of an innovative AI-powered nutrition app focused on personalized wellness coaching.",
    challenge: "Create an engaging, personalized nutrition tracking experience that scales across both B2C and B2B markets.",
    solution: "Designed an intuitive app with AI-driven coaching features, seamless UX, and a modular SDK for white-label integration.",
    outcome: "Successfully expanded market reach through accessible design and B2B customizations while improving user engagement.",
    linkText: 'Project showcase →',
    link: "https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%92%81%E2%80%8D%E2%99%82%EF%B8%8F-Portfolio-%E2%80%94-Feb-2025?node-id=197-14820&p=f&viewport=1123%2C263%2C0.17&t=NFL2SDKCCnSotTK3-0&scaling=min-zoom&scaling=scale-down-width&starting-point-node-id=197%3A15045&show-proto-sidebar=1"
  }
};

export const COMMANDS = {
  HELP: 'help',
  COMMANDS: 'commands',
  MENU: 'menu',
  QUESTION_MARK: '?',
  
  PORTFOLIO: 'portfolio',
  PROJECTS: 'projects',
  WORK: 'work',
  CASES: 'cases',
  CASE_STUDIES: 'case-studies',
  EXPERIENCE: 'experience',
  EXAMPLES: 'examples',
  SHOWCASE: 'showcase',
  RESUME: 'resume',
  
  ABOUT: 'about',
  INFO: 'info',
  INFORMATION: 'information',
  BIO: 'bio',
  BACKGROUND: 'background',
  WHO: 'who',
  
  CONTACT: 'contact',
  CONNECT: 'connect',
  CHAT: 'chat',
  REACH: 'reach',
  REACH_OUT: 'reach-out',
  HIRE: 'hire',
  
  BACK: 'back',
};

export const RESPONSES = {
  HELP: `Available commands:\n
→ **help** or **?**: Show this help message
→ **about** or **bio**: Learn about me
→ **portfolio**, **projects**, **work**, or **cases**: View my case studies
→ **contact** or **connect**: Get in touch`,

  ABOUT: `I'm Andrew Liebchen, a product designer with over a decade of experience crafting stellar products.
I specialize in helping startups build beautiful, functional products that users love.
My background in architecture and front-end development allows me to bridge the gap between design and implementation.

Type **projects** to see my work or **contact** to get in touch.`,

  CONTACT: `Message me on LinkedIn: ${LINKEDIN_LINK}
Or schedule a call: ${CALENDLY_LINK}`,

  PORTFOLIO: `Here are my case studies:
1 → **Watch Duty**: Wildfire Awareness [${CASE_STUDIES[2].linkText}](${CASE_STUDIES[2].link})
2 → **Meta Quest**: Bridge to the Metaverse [${CASE_STUDIES[1].linkText}](${CASE_STUDIES[1].link})
3 → **Miri**: AI-powered wellness coach [${CASE_STUDIES[3].linkText}](${CASE_STUDIES[3].link})

Type the number of the case study you'd like to explore.`,

  INVALID_SELECTION: `Invalid selection. Type **portfolio** to see the list again.`,
  
  NOT_RECOGNIZED: `Command not recognized. Type **help** for available commands.`,

}; 