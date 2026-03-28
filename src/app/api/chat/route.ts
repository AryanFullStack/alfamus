import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, profile } = await req.json();

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
      console.error("No OpenRouter API key found. Triggering fallback.");
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    let systemPrompt = "You are an AI assistant for a job board called Alfamus.";
    
    if (profile === "career-coach") {
      systemPrompt = "You are a Career Coach on Alfamus, a premium job board. Help the user with job search strategies, resume writing, interview prep, and salary negotiation. Keep your answers concise, structured, and friendly.";
    } else if (profile === "tech-expert") {
      systemPrompt = "You are a Tech Expert on Alfamus. Help the user prep for coding interviews, system design, and technical assessments. Use code blocks if necessary. Keep answers concise and strictly technical.";
    } else if (profile === "fresher-guide") {
      systemPrompt = "You are a Fresher Guide on Alfamus, helping entry-level candidates land their first job. Provide encouraging and actionable advice on resumes, portfolios, and where to apply. Be concise and empathetic.";
    }

    // List of free models to try in order of preference
    const models = [
      "openrouter/free", // Best dynamic choice
      "google/gemma-3-27b-it:free",
      "google/gemma-3-12b-it:free",
      "mistralai/mistral-small-3.1-24b-instruct:free",
      "qwen/qwen3-coder:free"
    ];

    let lastError = null;
    let assistantMessage = null;

    for (const currentModel of models) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://alfamus.com",
            "X-Title": "Alfamus AI Assistant",
          },
          body: JSON.stringify({
            model: currentModel,
            max_tokens: 600,
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              ...messages.map((m: any) => ({
                role: m.role,
                content: m.content
              })),
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            assistantMessage = data.choices[0].message.content;
            break; // Success!
          }
        } else {
          const errorText = await response.text();
          lastError = `Model ${currentModel} failed: ${errorText}`;
          console.error(lastError);
          // Continue to next model
        }
      } catch (err: any) {
        lastError = `Fetch error for ${currentModel}: ${err.message}`;
        console.error(lastError);
        // Continue to next model
      }
    }

    if (!assistantMessage) {
      return NextResponse.json({ error: `All models failed. Last error: ${lastError}` }, { status: 500 });
    }

    return NextResponse.json({ response: assistantMessage });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
