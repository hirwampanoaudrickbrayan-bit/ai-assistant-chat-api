# AI Assistant Chat API

A lightweight Express API for a chat application that sends user messages to OpenAI and returns AI responses.

## Features
- `GET /api/health` health check
- `POST /api/chat` chatbot endpoint
- Accepts chat history for better responses
- Uses OpenAI GPT models

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create your environment file:
```bash
cp .env.example .env
```

3. Replace the OpenAI API key in `.env`:
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the server:
```bash
npm start
```

Or run in watch mode:
```bash
npm run dev
```

## Example request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain what REST API is in simple words",
    "history": []
  }'
```

## Example response

```json
{
  "answer": "A REST API is an interface that allows different software systems to communicate over HTTP using standard methods like GET, POST, PUT, and DELETE.",
  "model": "gpt-4o-mini",
  "success": true
}
```
