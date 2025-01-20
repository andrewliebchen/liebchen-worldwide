export const CASE_STUDIES = {
  1: {
    title: 'Meta Quest: Bridge to the Metaverse',
    description: 'I led the design for the Meta Quest app during Facebook\'s metamorphosis into Meta.',
    challenge: 'Create a must-have app for Oculus users while ramping up in-app revenue.',
    solution: 'A revamped landing page addressing user pain points and fostering social connections.',
    outcome: 'Boosted retention and engagement metrics significantly.'
  },
  2: {
    title: 'Watch Duty: Wildfire Awareness',
    description: 'Worked closely with a founder and volunteers to design an app that provides timely wildfire updates.',
    challenge: 'Ensure clarity and usability under high-stress conditions.',
    solution: 'Intuitive map interface and clear containment icons.',
    outcome: 'Became a go-to resource for Californians navigating wildfire risks.'
  },
  3: {
    title: "Miri: AI-powered wellness coach",
    description: "",
    challenge: "",
    solution: "",
    outcome: ""
  }
};

export const COMMANDS = {
  HELP: 'help',
  PORTFOLIO: 'portfolio',
  ABOUT: 'about',
  CONTACT: 'contact',
  BACK: 'back',
};

export const RESPONSES = {
  HELP: `Available commands:
- help: Show this help message
- about: Learn about me
- portfolio: View my case studies
- contact: Get in touch`,

  ABOUT: `I'm Andrew Liebchen, a product designer with over a decade of experience crafting stellar products.
I specialize in helping startups build beautiful, functional products that users love.
My background in architecture and front-end development allows me to bridge the gap between design and implementation.

Type 'portfolio' to see my work or 'contact' to get in touch.`,

  CONTACT: `Email me at: andrew@liebchen.world
Or schedule a call: https://calendly.com/andrewliebchen/25min`,

  PORTFOLIO: `Here are my case studies:
1. Meta Quest: Bridge to the Metaverse
2. Watch Duty: Wildfire Awareness

Type the number of the case study you'd like to explore.`,

  INVALID_SELECTION: `Invalid selection. Type 'portfolio' to see the list again.`,
  
  NOT_RECOGNIZED: `Command not recognized. Type 'help' for available commands.`,

}; 