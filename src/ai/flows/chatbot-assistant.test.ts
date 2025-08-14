import {chatbotAssistant} from './chatbot-assistant';

describe('chatbot-assistant', () => {
  it('should return a response for a suggested question', async () => {
    const response = await chatbotAssistant({query: 'Chi tiết gói 79 triệu?'});
    expect(response).toBeDefined();
    expect(response.response).toContain('79 million VND');
  }, 30000);
  
  it('should escalate when user asks for a representative', async () => {
    const response = await chatbotAssistant({query: 'Nối máy với tư vấn viên'});
    expect(response).toBeDefined();
    expect(response.shouldEscalate).toBe(true);
  }, 30000);
});
