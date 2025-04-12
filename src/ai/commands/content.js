import { CALENDLY_LINK, LINKEDIN_LINK } from '@/src/ai/config/openai';

export const CASE_STUDIES = {
  'watch-duty': {
    title: 'Watch Duty: Wildfire Awareness',
    description: 'Transformed an engineering prototype into a trusted wildfire tracking app relied on by thousands across California.',
    challenge: 'Create a real-time interface that could deliver critical fire updates during emergencies while staying clear, calm, and usable under stress.',
    solution: 'Defined core UX and information architecture, created the brand identity, designed the containment marker system, and built front-end components in React.',
    outcome: 'Watch Duty became the #1 app in the App Store during the LA wildfires. The core design scaled from a prototype into a mission-critical public resource.'
  },
  'meta-quest': {
    title: 'Meta Quest: Bridge to the Metaverse',
    description: 'Led product design for the Quest companion app during Meta’s transition from Facebook to Reality Labs.',
    challenge: 'Increase user engagement and retention while avoiding revenue drops during a critical holiday launch cycle, all under manufacturing constraints.',
    solution: 'Redesigned the app’s home screen to highlight device status, improved battery visibility based on user research, and prototyped at high fidelity for rapid testing.',
    outcome: 'Successfully shipped redesigned app ahead of factory deadlines. Retention and engagement increased without impacting ARPU, validating a user-first approach.'
  },
  'miri': {
    title: 'Miri: AI-Powered Wellness Coach',
    description: 'Freelanced as lead designer for Miri, a fast-moving AI nutrition coaching startup.',
    challenge: 'Build and iterate on onboarding, chat, and tracking flows across mobile and desktop while supporting coach-specific customizations and business growth.',
    solution: 'Designed and shipped production-ready features weekly, including structured meal logging, habit streaks, and white-labeled UI. Used AI tools to accelerate design and communication workflows.',
    outcome: 'Accelerated onboarding testing and iteration, increased user engagement, and enabled white-label deployments for B2B expansion—all while writing and shipping front-end code.'
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
→ **Watch Duty**: Wildfire Awareness
→ **Meta Quest**: Bridge to the Metaverse
→ **Miri**: AI-powered wellness coach

Type the name of the case study you'd like to explore (e.g. "watch duty", "meta quest", or "miri").`,

  INVALID_SELECTION: `Invalid selection. Type **portfolio** to see the list again.`,
  
  NOT_RECOGNIZED: `Command not recognized. Type **help** for available commands.`,

}; 