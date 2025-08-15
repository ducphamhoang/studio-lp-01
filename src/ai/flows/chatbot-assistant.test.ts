import { chatbotAssistant } from './chatbot-assistant';
import * as genkit from '@/ai/genkit';
import { ai } from '@/ai/genkit';

const TEST_TIMEOUT = 60000; // 60 seconds

// Mock the AI service
jest.mock('@/ai/genkit', () => {
  const mockAi = {
    generate: jest.fn(),
    defineTool: jest.fn((config, implementation) => {
      return { ...config, implementation };
    }),
    defineFlow: jest.fn((config, implementation) => {
      return implementation;
    }),
  };
  return {
    ai: mockAi,
  };
});

describe('chatbot-assistant', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a response for a suggested question', async () => {
    // Mock the AI response for a specific query
    (ai.generate as jest.Mock).mockResolvedValue({
      output: {
        response: 'The "Dream Wedding" package for 200 guests is 79 million VND. It includes the venue, 8-course meal, drinks, decoration, MC, sound system, wedding cake, and a honeymoon night at a 5-star hotel.',
        shouldEscalate: false,
      },
    });

    const response = await chatbotAssistant({ query: 'Chi tiết gói 79 triệu?' });
    expect(response).toBeDefined();
    expect(response.response).toContain('79 million VND');
    expect(ai.generate).toHaveBeenCalled();
  }, TEST_TIMEOUT);

  it('should escalate when user asks for a representative', async () => {
    // Mock the AI response for escalation
    (ai.generate as jest.Mock).mockResolvedValue({
      output: {
        response: 'A representative will be with you shortly.',
        shouldEscalate: true,
      },
    });

    const response = await chatbotAssistant({ query: 'Nối máy với tư vấn viên' });
    expect(response).toBeDefined();
    expect(response.shouldEscalate).toBe(true);
    expect(ai.generate).toHaveBeenCalled();
  }, TEST_TIMEOUT);

  it('should handle API errors gracefully', async () => {
    // Mock the AI to throw an error
    (ai.generate as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(chatbotAssistant({ query: 'Some query' })).rejects.toThrow('API Error');
  });
});
