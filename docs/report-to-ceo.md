# Environment Variables for Book Request Feature

To enable the Book Request feature, the following environment variables must be configured in the production environment (e.g., Vercel, Netlify):

## Required Variables

| Variable | Description | How to obtain |
| :--- | :--- | :--- |
| `TELEGRAM_BOT_TOKEN` | The API token for the Telegram Bot used to send notifications. | Create a bot via [@BotFather](https://t.me/botfather) on Telegram. |
| `TELEGRAM_CHAT_ID` | The unique identifier for the chat or group where requests should be sent. | Use a bot like [@userinfobot](https://t.me/userinfobot) or send a message to your bot and check `https://api.telegram.org/bot<your_token>/getUpdates`. |

## How it works
When a user submits a book request via the web platform, the backend sends a formatted message to the specified Telegram chat using these credentials. If these variables are missing, the request will fail with a `500 Server configuration error`.
