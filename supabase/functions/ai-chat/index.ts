const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPTS: Record<string, string> = {
  'career-coach': 'You are an experienced career coach at alfamus.com helping job seekers at all levels. Provide actionable, specific advice on job search strategies, resume writing, interview preparation, salary negotiation, and career transitions. Be encouraging but realistic. Keep responses concise (2-4 sentences max) and conversational. If asked about jobs, suggest browsing alfamus.com/jobs.',
  'tech-expert': 'You are a senior software engineer and technical interview coach at alfamus.com. Help developers prepare for coding interviews, system design questions, and technical assessments. Provide code examples when helpful. Keep responses concise (2-4 sentences max) unless code is needed. If asked about tech jobs, suggest checking alfamus.com/jobs.',
  'fresher-guide': 'You are a friendly mentor at alfamus.com specifically for fresh graduates and career beginners. Help them navigate their first job search, understand job requirements, build resumes from scratch, and manage expectations. Be warm, encouraging, and practical. Keep responses concise (2-4 sentences max). Suggest browsing entry-level jobs at alfamus.com/jobs.',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  try {
    const { messages, profile } = await req.json();

    const systemPrompt = SYSTEM_PROMPTS[profile] || SYSTEM_PROMPTS['career-coach'];

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      // Fallback to smart canned responses if no API key
      const fallbackResponses: Record<string, string[]> = {
        'career-coach': [
          "Great question! Start by updating your LinkedIn profile with quantified achievements — hiring managers spend only 7 seconds on resumes. What specific role are you targeting?",
          "For salary negotiation, research market rates on Glassdoor, Levels.fyi, and Payscale. Always negotiate — 70% of employers expect it. What's your target range?",
          "The STAR method (Situation, Task, Action, Result) is your best friend for behavioral interviews. Practice with real examples from past experiences. Want to run through one together?",
          "Networking accounts for 70-80% of jobs filled. Reach out to 5 new LinkedIn connections per week with personalized messages, not generic requests. Quality beats quantity!",
          "Your resume should lead with impact, not duties. Replace 'Responsible for managing...' with 'Managed X team, achieving Y% improvement in Z.' Numbers matter!",
        ],
        'tech-expert': [
          "For system design interviews, use this framework: requirements → capacity estimation → high-level design → detailed design → tradeoffs. What system would you like to practice?",
          "LeetCode patterns > random problems. Master: sliding window, two pointers, fast-slow pointers, intervals, BFS/DFS, dynamic programming, and binary search. Which area feels weakest?",
          "React interview tip: Be ready to explain reconciliation, fiber architecture, custom hooks, and performance optimization (memo, useMemo, useCallback). What stack are you interviewing for?",
          "For backend roles, know: CAP theorem, consistent hashing, database indexing strategies, caching patterns (write-through, cache-aside), and horizontal vs vertical scaling.",
          "A strong GitHub profile matters — contribute to open source, build 2-3 polished projects with READMEs, deployed demos, and proper commit history. What's your current project?",
        ],
        'fresher-guide': [
          "As a fresher, projects > internships on your resume. Build 2-3 projects that solve real problems — even small ones. Deployed projects with live demos impress recruiters far more than academic work!",
          "Your resume should be 1 page maximum. Put: Education → Skills → Projects → Work Experience (if any). Use action verbs and keep bullet points to 2-3 per section.",
          "Don't get discouraged by rejections — the average job seeker applies to 100-150 companies before landing a role. Set a daily goal: 5 applications/day, track everything in a spreadsheet.",
          "LinkedIn optimization tip: Use all 2,600 characters in your summary, add your skills, get 3+ endorsements, and post about your learning journey. Recruiters search by keywords!",
          "For entry-level roles, look at startups and SMEs, not just FAANG. Smaller companies offer more responsibility, faster growth, and are often more willing to train freshers.",
        ],
      };
      
      const responses = fallbackResponses[profile] || fallbackResponses['career-coach'];
      const lastUserMessage = messages[messages.length - 1]?.content || '';
      
      // Simple keyword matching for slightly smarter fallback
      let response = responses[Math.floor(Math.random() * responses.length)];
      if (lastUserMessage.toLowerCase().includes('resume') || lastUserMessage.toLowerCase().includes('cv')) {
        response = responses.find(r => r.toLowerCase().includes('resume')) || response;
      } else if (lastUserMessage.toLowerCase().includes('salary') || lastUserMessage.toLowerCase().includes('negotiat')) {
        response = responses.find(r => r.toLowerCase().includes('salary') || r.toLowerCase().includes('negotiat')) || response;
      }
      
      return new Response(
        JSON.stringify({ response }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Call OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    const response = data.choices[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.';

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
