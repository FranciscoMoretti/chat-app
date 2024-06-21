import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import {NextResponse} from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = await generateText({
        model: openai('gpt-4-turbo'),
        messages: [{
            role: 'system',
            content: prompt,
        }]
    });

    return NextResponse.json({ reply: result.responseMessages[0].content[0].text });
}