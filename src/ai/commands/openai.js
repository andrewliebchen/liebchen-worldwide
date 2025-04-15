import { BACKGROUND_CONTEXT } from '@/src/ai/context/background';
import { CONTACT_INFO, shouldEnforceQueryLimits } from '@/src/ai/config/openai';
import { CASE_STUDIES, getContactInfoMarkdown, STATIC_CONTEXT } from '@/src/ai/context';
import { SYSTEM_PROMPT } from '@/src/ai/config/SYSTEM_PROMPT';

const API_URL = '';  // Empty string for relative URLs in all environments

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
                  getContactInfoMarkdown()
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
                getContactInfoMarkdown(),
        caseStudy: aiResponse.caseStudy,
        dynamicCommands: aiResponse.dynamicCommands
      };
    }

    return {
      type: 'ai-response',
      content: aiResponse.text,
      caseStudy: aiResponse.caseStudy,
      dynamicCommands: aiResponse.dynamicCommands
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      type: 'error',
      content: 'Sorry, I couldn\'t process that. Type `help` for available commands.'
    };
  }
}; 