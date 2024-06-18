import { config } from 'dotenv';
import OpenAI from 'openai';
config()
// Initialize OpenAI API client (example)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: 'https://api.openai.com/v1',
});

// Example function to use the API client
export const generateAnswer = async function(questionText) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: questionText }],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error('Error calling OpenAI API:', err.message);
    throw err;
  }
}
