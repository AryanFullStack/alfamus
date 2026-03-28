-- Add priority_score column to jobs table for custom sorting
-- Priority 1: Unskilled, Care Giver, Truck, Healthcare
-- Priority 2: Marketing, Finance, Data Science, Engineering
-- Priority 3: Others
-- Priority 4: Tech, Design

ALTER TABLE jobs ADD COLUMN IF NOT EXISTS priority_score INTEGER GENERATED ALWAYS AS (
  CASE
    WHEN category ILIKE '%Unskilled%' OR category ILIKE '%Care%Giver%' OR category ILIKE '%Caregiver%' OR category ILIKE '%Truck%' OR category ILIKE '%Health%Care%' OR category ILIKE '%Healthcare%' THEN 1
    WHEN category ILIKE '%Marketing%' OR category ILIKE '%Finance%' OR category ILIKE '%Data Science%' OR category ILIKE '%Engineering%' THEN 2
    WHEN category ILIKE '%Tech%' OR category ILIKE '%Design%' THEN 4
    ELSE 3
  END
) STORED;

-- Update existing records if the column was just added (GENERATED ALWAYS handles this automatically)
-- But we might want to index it for performance
CREATE INDEX IF NOT EXISTS idx_jobs_priority_created ON jobs (priority_score ASC, created_at DESC);
