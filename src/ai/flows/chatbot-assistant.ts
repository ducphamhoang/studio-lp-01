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
  shouldEscalate: z
    .boolean()
    .describe('Whether the chatbot should escalate to a live person.'),
});
export type ChatbotAssistantOutput = z.infer<typeof ChatbotAssistantOutputSchema>;

export async function chatbotAssistant(
  input: ChatbotAssistantInput
): Promise<ChatbotAssistantOutput> {
  return chatbotAssistantFlow(input);
}

const answerQuery = ai.defineTool(
  {
    name: 'answerQuery',
    description:
      'Answers a user query about wedding packages and scheduling at the restaurant.',
    inputSchema: z.object({
      query: z.string().describe('The user query.'),
    }),
    outputSchema: z.string().describe('The answer to the user query.'),
  },
  async (input) => {
    // In a real application, this would fetch the answer from a database or CMS.
    // For this example, we'll just return a canned response.
    const query = input.query.toLowerCase();
    if (query.includes('79 million') || query.includes('79 triệu')) {
      return `The "Dream Wedding" package for 200 guests is 79 million VND. It includes the venue, 8-course meal, drinks, decoration, MC, sound system, wedding cake, and a honeymoon night at a 5-star hotel.`;
    } else if (query.includes('schedule')) {
      return `Please contact us to check date availability.`;
    } else {
      return `I am sorry, I don't have information about that. Please contact a representative for further assistance.`;
    }
  }
);

const shouldEscalateTool = ai.defineTool(
  {
    name: 'shouldEscalate',
    description:
      'Determines whether the chatbot should escalate the conversation to a live person.',
    inputSchema: z.object({
      query: z.string().describe('The user query.'),
    }),
    outputSchema: z
      .boolean()
      .describe('Whether the chatbot should escalate to a live person.'),
  },
  async (input) => {
    // In a real application, this would use a more sophisticated algorithm to determine
    // whether to escalate the conversation.
    return (
      input.query.toLowerCase().includes('escalate') ||
      input.query.toLowerCase().includes('representative') ||
      input.query.toLowerCase().includes('tư vấn viên')
    );
  }
);

const chatbotAssistantFlow = ai.defineFlow(
  {
    name: 'chatbotAssistantFlow',
    inputSchema: ChatbotAssistantInputSchema,
    outputSchema: ChatbotAssistantOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a chatbot assistant for a wedding venue. Your primary goal is to answer user questions using the provided tools.

- Use the 'answerQuery' tool to respond to questions about packages and services.
- Use the 'shouldEscalate' tool to determine if the conversation needs to be handed off to a human.
- If the 'shouldEscalate' tool returns 'true', your final response should be "A representative will be with you shortly." and you must set the 'shouldEscalate' output field to true.
- If you cannot answer the query with the available tools, respond with "I'm not sure how to handle that. Would you like to speak to a representative?" and set 'shouldEscalate' to true.

User query: {{{query}}}`,
      tools: [answerQuery, shouldEscalateTool],
      model: 'googleai/gemini-1.5-flash',
      output: {
        schema: ChatbotAssistantOutputSchema,
      },
    });

    const response = llmResponse.output;
    if (!response) {
      throw new Error('No output from AI');
    }

    return response;
  }
);
