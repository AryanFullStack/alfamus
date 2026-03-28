-- Add featured_image column to jobs table
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS featured_image TEXT;
