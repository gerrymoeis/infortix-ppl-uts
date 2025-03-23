-- Drop authentication-related tables
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS saved_competitions;
DROP TABLE IF EXISTS competition_updates;

-- Modify competitions table
ALTER TABLE competitions 
DROP COLUMN is_verified;

-- Add new columns for bilingual support
ALTER TABLE competitions
ADD COLUMN title_en VARCHAR(255),
ADD COLUMN description_en TEXT,
ADD COLUMN requirements_en TEXT;

-- Add source tracking columns
ALTER TABLE competitions
ADD COLUMN last_scraped_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN scraper_id VARCHAR(100);

-- Modify categories table for bilingual support
ALTER TABLE categories
ADD COLUMN name_en VARCHAR(255);

-- Update existing categories with English translations
UPDATE categories
SET name_en = CASE 
    WHEN name = 'Teknologi' THEN 'Technology'
    WHEN name = 'Bisnis' THEN 'Business'
    WHEN name = 'Sains' THEN 'Science'
    WHEN name = 'Teknik' THEN 'Engineering'
    WHEN name = 'Seni & Desain' THEN 'Art & Design'
    WHEN name = 'Inovasi Sosial' THEN 'Social Innovation'
    WHEN name = 'Penelitian' THEN 'Research'
    WHEN name = 'Olahraga' THEN 'Sports'
    WHEN name = 'Lainnya' THEN 'Other'
END;

-- Reset categories with Indonesian names
TRUNCATE categories CASCADE;
INSERT INTO categories (name, name_en, slug) VALUES
    ('Teknologi', 'Technology', 'teknologi'),
    ('Bisnis', 'Business', 'bisnis'),
    ('Sains', 'Science', 'sains'),
    ('Teknik', 'Engineering', 'teknik'),
    ('Seni & Desain', 'Art & Design', 'seni-desain'),
    ('Inovasi Sosial', 'Social Innovation', 'inovasi-sosial'),
    ('Penelitian', 'Research', 'penelitian'),
    ('Olahraga', 'Sports', 'olahraga'),
    ('Lainnya', 'Other', 'lainnya');

-- Create a table for tracking scraping jobs
CREATE TABLE scraping_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    items_processed INTEGER DEFAULT 0,
    items_added INTEGER DEFAULT 0,
    items_updated INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_competitions_last_scraped ON competitions(last_scraped_at);
CREATE INDEX idx_scraping_jobs_status ON scraping_jobs(status);

-- Remove RLS policies since we don't need authentication
ALTER TABLE competitions DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Competitions are viewable by everyone" ON competitions;
DROP POLICY IF EXISTS "Only admins can insert competitions" ON competitions;
DROP POLICY IF EXISTS "Only admins can update competitions" ON competitions;
