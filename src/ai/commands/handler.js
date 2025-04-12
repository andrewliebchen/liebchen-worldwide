import { COMMANDS, RESPONSES, CASE_STUDIES } from './content';
import { generateResponse } from './openai';
import { track } from '@vercel/analytics';

// Safe analytics tracking that works in both client and server
const trackEvent = (eventName, properties) => {
  try {
    track(eventName, properties);
    console.log(`Successfully tracked event: ${eventName}`, properties);
  } catch (error) {
    console.error(`Analytics tracking failed for event: ${eventName}`, {
      error: error.message,
      properties,
      stack: error.stack
    });
  }
};

const isStaticCommand = (cmd) => {
  const command = cmd.toLowerCase().trim();
  return command.startsWith('help') ||
         command.startsWith('commands') ||
         command.startsWith('menu') ||
         command === '?' ||
         command.startsWith('portfolio') ||
         command.startsWith('projects') ||
         command.startsWith('work') ||
         command.startsWith('cases') ||
         command.startsWith('case-studies') ||
         command.startsWith('experience') ||
         command.startsWith('examples') ||
         command.startsWith('showcase') ||
         command.startsWith('resume') ||
         command.startsWith('about') ||
         command.startsWith('info') ||
         command.startsWith('information') ||
         command.startsWith('bio') ||
         command.startsWith('background') ||
         command.startsWith('who') ||
         command.startsWith('contact') ||
         command.startsWith('connect') ||
         command.startsWith('chat') ||
         command.startsWith('reach') ||
         command.startsWith('reach-out') ||
         command.startsWith('hire') ||
         command.startsWith('clear') ||
         command.startsWith('back') ||
         command.startsWith('ascii');
};

export const handleCommand = async (command, context = {}, queryCount = 0) => {
  const cmd = command.toLowerCase().trim();
  const [mainCommand, ...args] = cmd.split(' ');
  
  // Handle case study selection
  if (context.awaitingCaseStudy) {
    const input = cmd.toLowerCase().replace(/\s+/g, '-');
    console.log('Handler: Processing case study selection', {
      input,
      availableCaseStudies: Object.keys(CASE_STUDIES)
    });
    
    // Map common variations to canonical IDs
    const caseIdMap = {
      'watchduty': 'watch-duty',
      'watch': 'watch-duty',
      'meta': 'meta-quest',
      'quest': 'meta-quest',
      'metaquest': 'meta-quest',
    };

    const caseId = caseIdMap[input] || input;
    
    if (CASE_STUDIES[caseId]) {
      const study = CASE_STUDIES[caseId];
      console.log('Handler: Found case study', study);

      const response = {
        type: 'ai-response',
        content: `**${study.title}**

${study.description}

**Challenge**: ${study.challenge}

**Solution**: ${study.solution}

**Outcome**: ${study.outcome}`,
        caseStudy: caseId,
        currentCaseStudy: study.title,
        footer: `Type **back** to return to the portfolio or **contact** to learn more about working with me.`
      };
   
      console.log('Handler: Sending response', response);
      return response;
    }
    return {
      type: 'error',
      content: RESPONSES.INVALID_SELECTION
    };
  }

  // Handle static commands
  if (isStaticCommand(cmd)) {
    // Track the static command usage
    trackEvent('static_command', {
      command: mainCommand
    });

    switch (mainCommand) {
      case COMMANDS.HELP:
      case COMMANDS.COMMANDS:
      case COMMANDS.MENU:
      case COMMANDS.QUESTION_MARK:
        return {
          type: 'response',
          content: RESPONSES.HELP
        };
        
      case COMMANDS.ABOUT:
      case COMMANDS.INFO:
      case COMMANDS.INFORMATION:
      case COMMANDS.BIO:
      case COMMANDS.BACKGROUND:
      case COMMANDS.WHO:
        return {
          type: 'response',
          content: RESPONSES.ABOUT
        };
        
      case COMMANDS.CONTACT:
      case COMMANDS.CONNECT:
      case COMMANDS.CHAT:
      case COMMANDS.REACH:
      case COMMANDS.REACH_OUT:
      case COMMANDS.HIRE:
        return {
          type: 'response',
          content: RESPONSES.CONTACT
        };
        
      case COMMANDS.PORTFOLIO:
      case COMMANDS.PROJECTS:
      case COMMANDS.WORK:
      case COMMANDS.CASES:
      case COMMANDS.CASE_STUDIES:
      case COMMANDS.EXPERIENCE:
      case COMMANDS.EXAMPLES:
      case COMMANDS.SHOWCASE:
      case COMMANDS.RESUME:
        return {
          type: 'response',
          content: RESPONSES.PORTFOLIO,
          awaitCaseStudy: true
        };
        
      case COMMANDS.BACK:
        if (context.inCaseStudy) {
          return {
            type: 'response',
            content: RESPONSES.PORTFOLIO,
            awaitCaseStudy: true
          };
        }
        return {
          type: 'error',
          content: RESPONSES.NOT_RECOGNIZED
        };
        
      case COMMANDS.CLEAR:
        return {
          type: 'clear'
        };
        
      case COMMANDS.ASCII:
        if (!args.length) {
          return {
            type: 'response',
            content: RESPONSES.ASCII_HELP
          };
        }
        
        try {
          const imageUrl = args.join(' ');
          const ascii = await imageToAscii(imageUrl);
          return {
            type: 'ascii-art',
            content: ascii
          };
        } catch (error) {
          return {
            type: 'error',
            content: RESPONSES.ASCII_ERROR
          };
        }
        
      default:
        return {
          type: 'error',
          content: RESPONSES.NOT_RECOGNIZED
        };
    }
  }

  // Handle dynamic commands with OpenAI
  return await generateResponse(command, context, queryCount);
}; 