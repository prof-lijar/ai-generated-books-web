
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../src/app/api/request-book/route';
import { sendTelegramMessage } from '../src/lib/telegram';
import { NextRequest, NextResponse } from 'next/server';

vi.mock('../src/lib/telegram', () => ({
  sendTelegramMessage: vi.fn(),
}));

vi.mock('next/server', async () => {
  const actual = await vi.importActual('next/server');
  return {
    ...actual,
    NextResponse: {
      json: vi.fn((data, init) => ({
        status: init?.status || 200,
        json: async () => data,
      })),
    },
  };
});

describe('POST /api/request-book', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TELEGRAM_BOT_TOKEN = 'test_token';
    process.env.TELEGRAM_CHAT_ID = 'test_chat_id';
  });

  const createMockRequest = (body: any) => {
    return {
      json: async () => body,
    } as unknown as NextRequest;
  };

  it('should return 200 when request is valid', async () => {
    (sendTelegramMessage as any).mockResolvedValue({ success: true });

    const body = {
      title: 'Test Book',
      email: 'test@example.com',
      description: 'Test Description',
    };
    const request = createMockRequest(body);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Book request submitted successfully');
    expect(sendTelegramMessage).toHaveBeenCalledWith(
      expect.objectContaining({ botToken: 'test_token', chatId: 'test_chat_id' }),
      expect.stringContaining('Test Book')
    );
    expect(sendTelegramMessage).toHaveBeenCalledWith(
      expect.any(Object),
      expect.stringContaining('test@example.com')
    );
  });

  it('should return 400 when title is missing', async () => {
    const body = {
      email: 'test@example.com',
      description: 'Test Description',
    };
    const request = createMockRequest(body);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Title is required and must be a non-empty string');
  });

  it('should return 400 when email is missing', async () => {
    const body = {
      title: 'Test Book',
      description: 'Test Description',
    };
    const request = createMockRequest(body);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('A valid email address is required');
  });

  it('should return 400 when email is invalid', async () => {
    const body = {
      title: 'Test Book',
      email: 'invalid-email',
      description: 'Test Description',
    };
    const request = createMockRequest(body);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('A valid email address is required');
  });

  it('should return 500 when telegram notification fails', async () => {
    (sendTelegramMessage as any).mockResolvedValue({ success: false, error: 'Telegram API error' });

    const body = {
      title: 'Test Book',
      email: 'test@example.com',
    };
    const request = createMockRequest(body);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send notification');
  });

  it('should return 500 when environment variables are missing', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    
    const body = {
      title: 'Test Book',
      email: 'test@example.com',
    };
    const request = createMockRequest(body);

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Server configuration error');
  });
});
