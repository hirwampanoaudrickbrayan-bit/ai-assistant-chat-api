import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AI chatbot API is running',
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required',
      });
    }

    const formattedHistory = Array.isArray(history)
      ? history.map((msg) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: String(msg.content || ''),
        }))
      : [];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI assistant for a chat application. Answer clearly, accurately, and with a friendly tone. Be concise when possible, but provide enough detail when needed.',
        },
        ...formattedHistory,
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const answer = completion.choices[0]?.message?.content || 'I could not generate a response.';

    return res.status(200).json({
      answer,
      model: 'gpt-4o-mini',
      success: true,
    });
  } catch (error) {
    console.error('Chat API error:', error);

    return res.status(500).json({
      error: 'Something went wrong while generating the response.',
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`AI chat API running on http://localhost:${port}`);
});
