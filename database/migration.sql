-- Migration script to update ratings table for anonymous voting
-- Run this in your Supabase SQL Editor

-- Step 1: Drop the existing ratings table (this will delete all existing data)
DROP TABLE IF EXISTS ratings CASCADE;

-- Step 2: Recreate the ratings table with user_hash column
CREATE TABLE ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_hash TEXT NOT NULL, -- Hash of user email + dish + meal + date to prevent duplicate votes
  dish_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_hash, dish_name, meal_type, date)
);

-- Step 3: Enable Row Level Security
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policies for ratings table
CREATE POLICY "Users can read all ratings" ON ratings 
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON ratings 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own ratings" ON ratings 
  FOR UPDATE USING (true);

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ratings_dish_meal_date ON ratings(dish_name, meal_type, date);
CREATE INDEX IF NOT EXISTS idx_ratings_user_hash ON ratings(user_hash);

-- Step 6: Recreate the rating statistics view
CREATE OR REPLACE VIEW rating_stats AS
SELECT 
  dish_name,
  meal_type,
  date,
  COUNT(*) as total_ratings,
  ROUND(AVG(rating), 2) as average_rating,
  MIN(rating) as min_rating,
  MAX(rating) as max_rating
FROM ratings
GROUP BY dish_name, meal_type, date
ORDER BY date DESC, meal_type, dish_name;

-- Step 7: Grant permissions
GRANT SELECT ON rating_stats TO anon, authenticated;
