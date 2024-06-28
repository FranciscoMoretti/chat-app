import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for");
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(50, "1 d"),
  });

  const { success, limit, reset, remaining } = await ratelimit.limit(
    `chat_app_ratelimit_${ip}`
  );

  if (!success) {
    return new Response("You have reached your request limit for the day.", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  }

  const { prompt } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],

    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
    },
  });

  return result.toTextStreamResponse();
}
