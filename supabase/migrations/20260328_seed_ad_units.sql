-- Ensure slot is unique so ON CONFLICT works
ALTER TABLE ad_units ADD CONSTRAINT ad_units_slot_key UNIQUE (slot);

-- Seed default ad units for the dashboard
INSERT INTO ad_units (name, slot, ad_code, is_active)
VALUES 
  ('Top Header Ad', '9015835145', '<!-- AdSense Header -->', true),
  ('Job Redirect Ad', '1931348788', '<!-- AdSense Redirect -->', true)
ON CONFLICT (slot) DO UPDATE 
SET name = EXCLUDED.name, 
    ad_code = EXCLUDED.ad_code;
