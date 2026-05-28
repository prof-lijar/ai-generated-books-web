
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendTelegramMessage, TelegramConfig } from '../src/lib/telegram';

describe('sendTelegramMessage', () => {
  const mockConfig: TelegramConfig = {
    botToken: 'test_token',
    chatId: 'test_chat_id',
  };

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should return success true when Telegram API responds with ok', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      text: async () => '{"ok": true}',
    } as Response);

    const result = await sendTelegramMessage(mockConfig, 'Hello World');
    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.telegram.org/bottest_token/sendMessage',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          chat_id: 'test_chat_id',
          text: 'Hello World',
          parse_mode: 'Markdown',
        }),
      })
    );
  });

  it('should return success false when botToken is missing', async () => {
    const invalidConfig = { ...mockConfig, botToken: '' };
    const result = await sendTelegramMessage(invalidConfig, 'Hello');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Telegram configuration is missing');
  });

  it('should return success false when chatId is missing', async () => {
    const invalidConfig = { ...mockConfig, chatId: '' };
    const result = await sendTelegramMessage(invalidConfig, 'Hello');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Telegram configuration is missing');
  });

  it('should return success false when Telegram API returns an error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'Bad Request: chat not found',
    } as Response);

    const result = await sendTelegramMessage(mockConfig, 'Hello');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Telegram API error: 400 Bad Request: chat not found');
  });

  it('should return success false when fetch throws an exception', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network failure'));

    const result = await sendTelegramMessage(mockConfig, 'Hello');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Network failure');
  });
});
