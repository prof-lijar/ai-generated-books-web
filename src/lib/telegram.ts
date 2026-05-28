
export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export async function sendTelegramMessage(
  config: TelegramConfig,
  text: string
): Promise<{ success: boolean; error?: string }> {
  const { botToken, chatId } = config;

  if (!botToken || !chatId) {
    return {
      success: false,
      error: 'Telegram configuration is missing (BOT_TOKEN or CHAT_ID)',
    };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return {
        success: false,
        error: `Telegram API error: ${response.status} ${errorData}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred while sending Telegram message',
    };
  }
}
