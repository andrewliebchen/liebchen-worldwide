// Centralized context module for Andrew Liebchen's portfolio
// This file serves as the single source of truth for all biographical information,
// case studies, and contact links.

// Contact information
export const CONTACT_INFO = {
  CALENDLY_LINK: 'https://calendly.com/andrewliebchen/25min',
  EMAIL: 'andrewliebchen@gmail.com',
  LINKEDIN_LINK: 'https://www.linkedin.com/in/andrewliebchen/'
};

// Helper function to generate contact information as markdown
export const getContactInfoMarkdown = () => {
  return `Message me on [LinkedIn](${CONTACT_INFO.LINKEDIN_LINK})
Or [schedule a call](${CONTACT_INFO.CALENDLY_LINK})`;
};

// Case studies with consistent IDs
export const CASE_STUDY_IDS = {
  WATCH_DUTY: 'watch-duty',
  META_QUEST: 'meta-quest',
  MIRI: 'miri'
};

// Case study mapping for common variations
export const CASE_STUDY_MAPPING = {
  'watchduty': CASE_STUDY_IDS.WATCH_DUTY,
  'watch': CASE_STUDY_IDS.WATCH_DUTY,
  'watch-duty': CASE_STUDY_IDS.WATCH_DUTY,
  'watch duty': CASE_STUDY_IDS.WATCH_DUTY,
  'watch duty app': CASE_STUDY_IDS.WATCH_DUTY,
  'meta': CASE_STUDY_IDS.META_QUEST,
  'quest': CASE_STUDY_IDS.META_QUEST,
  'metaquest': CASE_STUDY_IDS.META_QUEST,
  'meta-quest': CASE_STUDY_IDS.META_QUEST,
  'meta quest': CASE_STUDY_IDS.META_QUEST,
  'meta quest app': CASE_STUDY_IDS.META_QUEST,
  'miri': CASE_STUDY_IDS.MIRI,
  'miri-ai': CASE_STUDY_IDS.MIRI,
  'miri ai': CASE_STUDY_IDS.MIRI,
  'miri-app': CASE_STUDY_IDS.MIRI,
  'miri app': CASE_STUDY_IDS.MIRI
};

// Case studies with detailed information
export const CASE_STUDIES = {
  [CASE_STUDY_IDS.WATCH_DUTY]: {
    title: 'Watch Duty: Wildfire Awareness',
    description: 'Transformed an engineering prototype into a trusted wildfire tracking app relied on by thousands across California.',
    challenge: 'Create a real-time interface that could deliver critical fire updates during emergencies while staying clear, calm, and usable under stress.',
    solution: 'Defined core UX and information architecture, created the brand identity, designed the containment marker system, and built front-end components in React.',
    outcome: 'Watch Duty became the #1 app in the App Store during the LA wildfires. The core design scaled from a prototype into a mission-critical public resource.'
  },
  [CASE_STUDY_IDS.META_QUEST]: {
    title: 'Meta Quest: Bridge to the Metaverse',
    description: 'Led product design for the Quest companion app during Meta\'s transition from Facebook to Reality Labs.',
    challenge: 'Increase user engagement and retention while avoiding revenue drops during a critical holiday launch cycle, all under manufacturing constraints.',
    solution: 'Redesigned the app\'s home screen to highlight device status, improved battery visibility based on user research, and prototyped at high fidelity for rapid testing.',
    outcome: 'Successfully shipped redesigned app ahead of factory deadlines. Retention and engagement increased without impacting ARPU, validating a user-first approach.'
  },
  [CASE_STUDY_IDS.MIRI]: {
    title: 'Miri: AI-Powered Wellness Coach',
    description: 'Freelanced as lead designer for Miri, a fast-moving AI nutrition coaching startup.',
    challenge: 'Build and iterate on onboarding, chat, and tracking flows across mobile and desktop while supporting coach-specific customizations and business growth.',
    solution: 'Designed and shipped production-ready features weekly, including structured meal logging, habit streaks, and white-labeled UI. Used AI tools to accelerate design and communication workflows.',
    outcome: 'Accelerated onboarding testing and iteration, increased user engagement, and enabled white-label deployments for B2B expansion—all while writing and shipping front-end code.'
  }
};

// Helper function to build projects context
export const buildProjectsContext = () => {
  return Object.entries(CASE_STUDIES).map(([id, study]) => {
    return `${id}. ${study.title}
   → ${study.description}
   → Challenge: ${study.challenge}
   → Solution: ${study.solution}
   → Outcome: ${study.outcome}`;
  }).join('\n\n');
};

// Command definitions
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
  CLEAR: 'clear'
};

// Command responses
export const RESPONSES = {
  HELP: `Available commands:\n
→ **help** or **?**: Show this help message
→ **about** or **bio**: Learn about me
→ **portfolio**, **projects**, **work**, or **cases**: View my case studies
→ **contact** or **connect**: Get in touch`,

ABOUT: `Andrew Liebchen is a senior product designer with a background in architecture, a fondness for frontend, and a knack for bringing clarity to complex problems. 
He helps startups move fast, guides teams through ambiguity, and designs tools people actually depend on—from Meta's VR platform to wildfire response apps.

Want the backstory? Type **projects** to explore his work.`,

  CONTACT: getContactInfoMarkdown(),

  PORTFOLIO: `Andrew's case studies span crisis response, cutting-edge tech, and conversational AI. Highlights include:
→ **Watch Duty** — Designing a wildfire app people trust with their lives
→ **Meta Quest** — Improving the VR companion app for millions of users
→ **Miri** — Shipping fast on an AI-powered wellness platform

Type the name of a case (e.g. "watch duty", "meta quest", or "miri") to learn more.`,

  INVALID_SELECTION: `Invalid selection. Type **portfolio** to see the list again.`,
  
  NOT_RECOGNIZED: `Command not recognized. Type **help** for available commands.`
};

// Export background context from the existing file
import { BACKGROUND_CONTEXT } from './background';
export { BACKGROUND_CONTEXT };

// Static context for AI responses - builds on BACKGROUND_CONTEXT
export const STATIC_CONTEXT = `
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