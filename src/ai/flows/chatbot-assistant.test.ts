import {chatbotAssistant} from './chatbot-assistant';

describe('chatbot-assistant', () => {
  it('should return a response for a suggested question', async () => {
    const response = await chatbotAssistant({query: 'Chi tiết gói 79 triệu?'});
    expect(response).toBeDefined();
    expect(response.response).toContain('79 million VND');
    expect(response.shouldEscalate).toBe(false);
  }, 30000);
});
