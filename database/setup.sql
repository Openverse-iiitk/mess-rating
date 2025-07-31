-- IIIT Kottayam Mess Rating System Database Setup
-- Run this script in your Supabase SQL Editor

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ratings table with anonymous voting support
CREATE TABLE IF NOT EXISTS ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_hash TEXT NOT NULL, -- Hash of user email + dish + meal + date to prevent duplicate votes
  dish_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_hash, dish_name, meal_type, date)
);

-- Create menu_items table (optional - for dynamic menu management)
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dish_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')) NOT NULL,
  date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read all ratings" ON ratings;
DROP POLICY IF EXISTS "Users can insert their own ratings" ON ratings;
DROP POLICY IF EXISTS "Users can update their own ratings" ON ratings;
DROP POLICY IF EXISTS "Everyone can read menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can manage menu items" ON menu_items;

-- Create policies for user_profiles table
CREATE POLICY "Users can read their own profile" ON user_profiles 
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON user_profiles 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" ON user_profiles 
  FOR UPDATE USING (true);

-- Create policies for ratings table
CREATE POLICY "Users can read all ratings" ON ratings 
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ratings" ON ratings 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own ratings" ON ratings 
  FOR UPDATE USING (true);

-- Create policies for menu_items table
CREATE POLICY "Everyone can read menu items" ON menu_items 
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage menu items" ON menu_items 
  FOR ALL USING (true);

-- Insert sample menu items for today
INSERT INTO menu_items (dish_name, meal_type, date, is_active) VALUES
-- Breakfast
('Idly', 'breakfast', CURRENT_DATE, true),
('Dosa', 'breakfast', CURRENT_DATE, true),
('Sambar', 'breakfast', CURRENT_DATE, true),
('Chutney', 'breakfast', CURRENT_DATE, true),

-- Lunch
('Rice', 'lunch', CURRENT_DATE, true),
('Dal Tadka', 'lunch', CURRENT_DATE, true),
('Sambar', 'lunch', CURRENT_DATE, true),
('Rasam', 'lunch', CURRENT_DATE, true),
('Vegetable Curry', 'lunch', CURRENT_DATE, true),

-- Snacks
('Tea', 'snacks', CURRENT_DATE, true),
('Biscuits', 'snacks', CURRENT_DATE, true),
('Namkeen', 'snacks', CURRENT_DATE, true),

-- Dinner
('Chapati', 'dinner', CURRENT_DATE, true),
('Rice', 'dinner', CURRENT_DATE, true),
('Paneer Curry', 'dinner', CURRENT_DATE, true),
('Dal', 'dinner', CURRENT_DATE, true),
('Pickle', 'dinner', CURRENT_DATE, true)

ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_ratings_dish_meal_date ON ratings(dish_name, meal_type, date);
CREATE INDEX IF NOT EXISTS idx_ratings_user_hash ON ratings(user_hash);
CREATE INDEX IF NOT EXISTS idx_menu_items_date_meal ON menu_items(date, meal_type);

-- Create a view for easy rating statistics
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

-- Grant permissions on the view
GRANT SELECT ON rating_stats TO anon, authenticated;

-- Grant permissions on user_profiles table  
GRANT SELECT, INSERT, UPDATE ON user_profiles TO anon, authenticated;
