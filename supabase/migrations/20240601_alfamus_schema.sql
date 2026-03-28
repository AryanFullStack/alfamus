CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  category TEXT NOT NULL DEFAULT 'Tech',
  description TEXT,
  apply_url TEXT NOT NULL,
  source_platform TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_ai_pick BOOLEAN DEFAULT false,
  ai_summary TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category TEXT NOT NULL DEFAULT 'Career',
  author TEXT DEFAULT 'alfamus',
  read_time INTEGER DEFAULT 5,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slot TEXT NOT NULL,
  ad_code TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chatbot_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_name TEXT NOT NULL,
  system_prompt TEXT,
  model TEXT DEFAULT 'gpt-4o-mini',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO jobs (title, company, company_logo, location, job_type, salary_min, salary_max, category, description, apply_url, is_featured, is_ai_pick, ai_summary, source_platform) VALUES
('Senior Frontend Engineer', 'Stripe', 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=64&q=80', 'San Francisco, CA', 'Full-time', 120000, 180000, 'Tech', 'Build the financial infrastructure of the internet.', 'https://stripe.com/jobs', true, true, 'Stripe is looking for a senior engineer to join their payments team. Strong React/TypeScript skills required.', 'LinkedIn'),
('Product Designer', 'Figma', 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=64&q=80', 'Remote', 'Remote', 100000, 150000, 'Design', 'Design tools that empower millions of creatives.', 'https://figma.com/careers', true, true, 'Figma seeks a product designer passionate about collaborative design tools and developer handoff.', 'Indeed'),
('Data Scientist', 'Airbnb', 'https://images.unsplash.com/photo-1614680376408-16afefa3332b?w=64&q=80', 'New York, NY', 'Full-time', 130000, 190000, 'Tech', 'Turn data into insights for global travel.', 'https://airbnb.com/careers', true, true, 'Airbnb is hiring a data scientist to work on pricing algorithms and host/guest matching models.', 'Glassdoor'),
('Marketing Manager', 'HubSpot', NULL, 'Boston, MA', 'Full-time', 80000, 120000, 'Marketing', 'Lead growth marketing initiatives.', 'https://hubspot.com/jobs', true, false, NULL, 'LinkedIn'),
('Backend Engineer', 'Vercel', NULL, 'Remote', 'Remote', 110000, 160000, 'Tech', 'Build edge infrastructure at scale.', 'https://vercel.com/careers', true, false, NULL, 'Indeed'),
('UX Researcher', 'Google', NULL, 'Mountain View, CA', 'Full-time', 140000, 200000, 'Design', 'Research that shapes billions of users.', 'https://google.com/careers', true, false, NULL, 'Google Careers'),
('Content Strategist', 'Buffer', NULL, 'Remote', 'Contract', 60000, 80000, 'Marketing', 'Craft compelling stories for social media.', 'https://buffer.com/journey', false, false, NULL, 'LinkedIn'),
('DevOps Engineer', 'Cloudflare', NULL, 'Austin, TX', 'Full-time', 115000, 165000, 'Tech', 'Secure the internet at scale.', 'https://cloudflare.com/careers', false, false, NULL, 'Indeed'),
('Financial Analyst', 'Robinhood', NULL, 'Menlo Park, CA', 'Full-time', 90000, 130000, 'Finance', 'Democratize finance for all.', 'https://robinhood.com/careers', false, false, NULL, 'LinkedIn'),
('Mobile Developer', 'Duolingo', NULL, 'Pittsburgh, PA', 'Full-time', 110000, 155000, 'Tech', 'Build the world''s most popular language app.', 'https://duolingo.com/careers', false, false, NULL, 'Glassdoor'),
('Growth Hacker', 'Notion', NULL, 'Remote', 'Full-time', 90000, 130000, 'Marketing', 'Drive viral growth for the all-in-one workspace.', 'https://notion.so/careers', false, false, NULL, 'LinkedIn'),
('AI/ML Engineer', 'OpenAI', NULL, 'San Francisco, CA', 'Full-time', 200000, 350000, 'Tech', 'Build the future of artificial intelligence.', 'https://openai.com/careers', false, true, 'OpenAI is looking for ML engineers to advance frontier AI research. Exceptional compensation package.', 'LinkedIn')
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, featured_image, category, author, read_time, is_published, published_at) VALUES
('10 Resume Tips That Actually Get You Hired in 2024', '10-resume-tips-2024', 'Stand out in a crowded job market with these proven resume strategies used by top hiring managers at FAANG companies.', 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', 'Career', 'alfamus', 8, true, NOW() - INTERVAL '2 days'),
('How to Ace Your Technical Interview: A Complete Guide', 'ace-technical-interview-guide', 'From data structures to system design — everything you need to know to land your dream engineering role.', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80', 'Tech', 'alfamus', 12, true, NOW() - INTERVAL '5 days'),
('Remote Work in 2024: Best Companies Hiring Globally', 'remote-work-best-companies-2024', 'Discover the top 50 companies that offer genuine remote-first culture, competitive pay, and async-friendly workflows.', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', 'Remote Work', 'alfamus', 6, true, NOW() - INTERVAL '7 days')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_settings (profile_name, system_prompt, model, is_active, sort_order) VALUES
('Career Coach', 'You are an experienced career coach helping job seekers at all levels. Provide actionable advice on job search strategies, interview preparation, salary negotiation, and career transitions. Be encouraging but realistic.', 'gpt-4o-mini', true, 0),
('Tech Expert', 'You are a senior software engineer and technical interview coach. Help developers prepare for coding interviews, system design questions, and technical assessments. Provide code examples when helpful.', 'gpt-4o-mini', true, 1),
('Fresher Guide', 'You are a mentor specifically for fresh graduates and career beginners. Help them navigate their first job search, understand job requirements, build their resume from scratch, and manage expectations for entry-level roles.', 'gpt-4o-mini', true, 2)
ON CONFLICT DO NOTHING;
