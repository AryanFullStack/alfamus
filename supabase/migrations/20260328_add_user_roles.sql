-- Add role column to public.users if it doesn't already exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE public.users ADD COLUMN role text DEFAULT 'user';
    END IF;
END $$;

-- IMPORTANT: You will need to run the following command in the Supabase SQL Editor manually 
-- to set your email account as an admin. Copy and paste the block below to run it.

/*
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'aryanwaheednew@gmail.com';
*/
