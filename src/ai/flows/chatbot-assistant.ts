// chatbot-assistant.ts
'use server';

/**
 * @fileOverview A chatbot assistant flow that answers common questions and escalates to a live person if needed.
 *
 * - chatbotAssistant - A function that handles the chatbot assistant process.
 * - ChatbotAssistantInput - The input type for the chatbotAssistant function.
 * - ChatbotAssistantOutput - The return type for the chatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistantInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type ChatbotAssistantInput = z.infer<typeof ChatbotAssistantInputSchema>;

const ChatbotAssistantOutputSchema = z.object({
  response: z.string().describe('The chatbot response.'),
  shouldEscalate: z.boolean().describe('Whether the chatbot should escalate to a live person.'),
});
export type ChatbotAssistantOutput = z.infer<typeof ChatbotAssistantOutputSchema>;

export async function chatbotAssistant(input: ChatbotAssistantInput): Promise<ChatbotAssistantOutput> {
  return chatbotAssistantFlow(input);
}

const answerQuery = ai.defineTool({
  name: 'answerQuery',
  description: 'Answers a user query about wedding packages and scheduling at the restaurant.',
  inputSchema: z.object({
    query: z.string().describe('The user query.'),
  }),
  outputSchema: z.string().describe('The answer to the user query.'),
}, async (input) => {
  // In a real application, this would fetch the answer from a database or CMS.
  // For this example, we'll just return a canned response.
  if (input.query.toLowerCase().includes('79 million')) {
    return `The \"Dream Wedding\" package for 200 guests is 79 million VND. It includes the venue, 8-course meal, drinks, decoration, MC, sound system, wedding cake, and a honeymoon night at a 5-star hotel.`
  } else if (input.query.toLowerCase().includes('schedule')) {
    return `Please contact us to check date availability.`
  } else {
    return `I am sorry, I don't have information about that. Please contact a representative for further assistance.`
  }
});

const shouldEscalate = ai.defineTool({
  name: 'shouldEscalate',
  description: 'Determines whether the chatbot should escalate the conversation to a live person.',
  inputSchema: z.object({
    query: z.string().describe('The user query.'),
  }),
  outputSchema: z.boolean().describe('Whether the chatbot should escalate to a live person.'),
}, async (input) => {
  // In a real application, this would use a more sophisticated algorithm to determine
  // whether to escalate the conversation.
  // For this example, we'll escalate if the query contains the word "escalate".
  return input.query.toLowerCase().includes('escalate');
});

const chatbotAssistantFlow = ai.defineFlow(
  {
    name: 'chatbotAssistantFlow',
    inputSchema: ChatbotAssistantInputSchema,
    outputSchema: ChatbotAssistantOutputSchema,
  },
  async input => {
    const {
      response
    } = await ai.generate({
      prompt: `You are a chatbot assistant for a wedding venue. Use the available tools to answer the user query. If you cannot answer the query, or if the shouldEscalate tool returns true, indicate that the conversation should be escalated to a live person. 

User query: {{{query}}}`,
      tools: [answerQuery, shouldEscalate],
    });

    let should_Escalate = await shouldEscalate({
        query: input.query
    });

    return {
      response: response.text,
      shouldEscalate: should_Escalate,
    };
  }
);
