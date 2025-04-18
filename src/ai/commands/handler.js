import { 
  COMMANDS, 
  RESPONSES, 
  CASE_STUDIES, 
  CASE_STUDY_MAPPING 
} from '@/src/ai/context';
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

// Command registry for more declarative command handling
const COMMAND_REGISTRY = {
  // Help commands
  [COMMANDS.HELP]: { response: RESPONSES.HELP },
  [COMMANDS.COMMANDS]: { response: RESPONSES.HELP },
  [COMMANDS.MENU]: { response: RESPONSES.HELP },
  [COMMANDS.QUESTION_MARK]: { response: RESPONSES.HELP },
  
  // About commands
  [COMMANDS.ABOUT]: { response: RESPONSES.ABOUT },
  [COMMANDS.INFO]: { response: RESPONSES.ABOUT },
  [COMMANDS.INFORMATION]: { response: RESPONSES.ABOUT },
  [COMMANDS.BIO]: { response: RESPONSES.ABOUT },
  [COMMANDS.BACKGROUND]: { response: RESPONSES.ABOUT },
  [COMMANDS.WHO]: { response: RESPONSES.ABOUT },
  
  // Contact commands
  [COMMANDS.CONTACT]: { response: RESPONSES.CONTACT },
  [COMMANDS.CONNECT]: { response: RESPONSES.CONTACT },
  [COMMANDS.CHAT]: { response: RESPONSES.CONTACT },
  [COMMANDS.REACH]: { response: RESPONSES.CONTACT },
  [COMMANDS.REACH_OUT]: { response: RESPONSES.CONTACT },
  [COMMANDS.HIRE]: { response: RESPONSES.CONTACT },
  
  // Portfolio commands
  [COMMANDS.PORTFOLIO]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.PROJECTS]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.WORK]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.CASES]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.CASE_STUDIES]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.EXPERIENCE]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.EXAMPLES]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.SHOWCASE]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  [COMMANDS.RESUME]: { response: RESPONSES.PORTFOLIO, awaitCaseStudy: true },
  
  // Clear command
  [COMMANDS.CLEAR]: { type: 'clear' }
};

// Check if a command is in our registry
const isStaticCommand = (cmd) => {
  const command = cmd.toLowerCase().trim();
  return Object.keys(COMMAND_REGISTRY).some(key => 
    command === key.toLowerCase()
  );
};

// Commands that should always be treated as commands, even in case study context
const isPrimaryCommand = (cmd) => {
  const command = cmd.toLowerCase().trim();
  return command === COMMANDS.HELP ||
         command === COMMANDS.COMMANDS ||
         command === COMMANDS.MENU ||
         command === COMMANDS.QUESTION_MARK ||
         command === COMMANDS.PORTFOLIO ||
         command === COMMANDS.PROJECTS ||
         command === COMMANDS.WORK ||
         command === COMMANDS.CASES ||
         command === COMMANDS.CASE_STUDIES ||
         command === COMMANDS.EXPERIENCE ||
         command === COMMANDS.EXAMPLES ||
         command === COMMANDS.SHOWCASE ||
         command === COMMANDS.RESUME ||
         command === COMMANDS.ABOUT ||
         command === COMMANDS.INFO ||
         command === COMMANDS.INFORMATION ||
         command === COMMANDS.BIO ||
         command === COMMANDS.BACKGROUND ||
         command === COMMANDS.WHO ||
         command === COMMANDS.CONTACT ||
         command === COMMANDS.CLEAR;
};

export const handleCommand = async (command, context = {}, queryCount = 0) => {
  const cmd = command.toLowerCase().trim();
  const [mainCommand, ...args] = cmd.split(' ');
  
  // Always handle primary commands regardless of context
  if (isPrimaryCommand(cmd)) {
    // Track the static command usage
    trackEvent('static_command', {
      command: mainCommand
    });

    // Check if the command is in our registry
    for (const [key, handler] of Object.entries(COMMAND_REGISTRY)) {
      if (cmd === key.toLowerCase()) {
        return {
          type: handler.type || 'response',
          content: handler.response,
          awaitCaseStudy: handler.awaitCaseStudy
        };
      }
    }
  }

  // Handle case study commands directly
  const input = cmd.toLowerCase().replace(/\s+/g, '-');
  const caseId = CASE_STUDY_MAPPING[input] || input;
  
  if (CASE_STUDIES[caseId]) {
    const study = CASE_STUDIES[caseId];
    console.log('Handler: Found case study', study);

    // Track the case study command usage
    trackEvent('case_study_command', {
      command: cmd,
      caseStudy: caseId
    });

    const response = {
      type: 'ai-response',
      content: `${study.description}\n\n→ **Challenge**: ${study.challenge}\n\n→ **Solution**: ${study.solution}\n\n→ **Outcome**: ${study.outcome}`,
      caseStudy: caseId,
      currentCaseStudy: study.title,
      footer: `Type **back** to return to the portfolio or **contact** to learn more about working with me.`
    };
 
    console.log('Handler: Sending response', response);
    return response;
  }

  // Handle case study selection in portfolio context
  if (context.awaitingCaseStudy) {
    console.log('Handler: Processing case study selection', {
      input,
      availableCaseStudies: Object.keys(CASE_STUDIES)
    });
    
    if (CASE_STUDIES[caseId]) {
      const study = CASE_STUDIES[caseId];
      console.log('Handler: Found case study', study);

      const response = {
        type: 'ai-response',
        content: `${study.description}\n**Challenge**: ${study.challenge}\n\n**Solution**: ${study.solution}\n\n**Outcome**: ${study.outcome}`,
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

  // Handle other static commands
  if (isStaticCommand(cmd)) {
    return {
      type: 'error',
      content: RESPONSES.NOT_RECOGNIZED
    };
  }

  // Handle AI queries
  return await generateResponse(command, context, queryCount);
}; 