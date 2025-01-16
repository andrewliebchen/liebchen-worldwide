import { COMMANDS, RESPONSES, CASE_STUDIES } from './content';
import { generateResponse } from './openai';
import { imageToAscii } from '../utils/asciiArt';

const isStaticCommand = (cmd) => {
  const command = cmd.toLowerCase().trim();
  return command.startsWith('help') ||
         command.startsWith('portfolio') ||
         command.startsWith('contact') ||
         command.startsWith('clear') ||
         command.startsWith('back') ||
         command.startsWith('ascii');
};

export const handleCommand = async (command, context = {}, queryCount = 0) => {
  const cmd = command.toLowerCase().trim();
  const [mainCommand, ...args] = cmd.split(' ');
  
  // Handle case study selection
  if (context.awaitingCaseStudy) {
    const caseNumber = parseInt(cmd);
    if (caseNumber && CASE_STUDIES[caseNumber]) {
      const study = CASE_STUDIES[caseNumber];
      return {
        type: 'case-study',
        content: `> ${study.title}\n\n` +
                `${study.description}\n\n` +
                `**Challenge:** ${study.challenge}\n` +
                `**Solution:** ${study.solution}\n` +
                `**Outcome:** ${study.outcome}\n\n` +
                `Type 'back' to return to the portfolio or 'contact' to learn more about working with me.`,
        currentCaseStudy: study.title
      };
    }
    return {
      type: 'error',
      content: RESPONSES.INVALID_SELECTION
    };
  }

  // Handle static commands
  if (isStaticCommand(cmd)) {
    switch (mainCommand) {
      case COMMANDS.HELP:
        return {
          type: 'response',
          content: RESPONSES.HELP
        };
        
      case COMMANDS.ABOUT:
        return {
          type: 'response',
          content: RESPONSES.ABOUT
        };
        
      case COMMANDS.CONTACT:
        return {
          type: 'response',
          content: RESPONSES.CONTACT
        };
        
      case COMMANDS.PORTFOLIO:
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