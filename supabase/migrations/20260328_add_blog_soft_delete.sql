-- Add deleted_at column for soft delete support in blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL;

-- (Optional) Add RLS for blog_posts if not exists
-- Only admins can DELETE/INSERT/UPDATE blog_posts
-- Public can only READ blog_posts if not deleted

-- To enable RLS (optional if not already enabled)
-- ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for Public: only see non-deleted, published posts
-- DO $$ 
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view published posts') THEN
--         CREATE POLICY "Public can view published posts" ON public.blog_posts
--         FOR SELECT USING (is_published = true AND deleted_at IS NULL);
--     END IF;
-- END $$;

-- Policy for Admin: full access
-- DO $$ 
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins have full access to blog_posts') THEN
--         CREATE POLICY "Admins have full access to blog_posts" ON public.blog_posts
--         USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
--     END IF;
-- END $$;
