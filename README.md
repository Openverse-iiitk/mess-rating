# IIIT Kottayam Mess Rating System

A modern web application for rating mess food items, built with Next.js, Supabase, and NextAuth.

## Features

- 🔐 Google Authentication (restricted to @iiitkottayam.ac.in emails)
- 🍽️ Rate dishes for Breakfast, Lunch, Snacks, and Dinner
- 📊 View average ratings for each dish
- 🎨 Beautiful UI with animated components (meteors, typewriter effect, pointer highlight)
- 📱 Responsive design
- 🚀 Real-time rating updates

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Database**: Supabase
- **UI Components**: Custom components with Framer Motion animations
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd mess-rating
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. In the SQL Editor, run this query to create the necessary tables:

```sql
-- Create ratings table
CREATE TABLE ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  dish_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_email, dish_name, meal_type, date)
);

-- Create menu_items table (optional - for dynamic menu management)
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dish_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')) NOT NULL,
  date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all ratings" ON ratings FOR SELECT USING (true);
CREATE POLICY "Users can insert their own ratings" ON ratings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own ratings" ON ratings FOR UPDATE USING (true);

CREATE POLICY "Everyone can read menu items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage menu items" ON menu_items FOR ALL USING (true);
```

3. Get your Supabase URL and anon key from the project settings

### 4. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Set authorized origins: `http://localhost:3000` (for development)
6. Set authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret

### 5. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your Vercel domain
5. Update Google OAuth authorized origins and redirect URIs to include your Vercel domain
6. Deploy!

## Usage

1. **Sign In**: Only users with @iiitkottayam.ac.in email addresses can sign in
2. **Rate Dishes**: Use the slider on each dish card to give a rating from 1-10
3. **View Average**: After rating, you'll see the average rating for that dish
4. **Daily Ratings**: Ratings are tracked per day, so you can rate the same dish differently each day

## Database Schema

### ratings table
- `id`: UUID primary key
- `user_email`: Email of the user who rated
- `dish_name`: Name of the dish
- `meal_type`: breakfast | lunch | snacks | dinner
- `rating`: Integer between 1-10
- `date`: Date of the rating
- `created_at`: Timestamp

### menu_items table (optional)
- `id`: UUID primary key
- `dish_name`: Name of the dish
- `meal_type`: breakfast | lunch | snacks | dinner
- `date`: Date when dish is served
- `is_active`: Boolean flag
- `created_at`: Timestamp

## Customization

- **Menu Items**: Edit the `todaysMenu` object in `/src/app/vote/page.tsx` to change daily menu
- **Dishes in Typewriter**: Edit the `dishes` array in `/src/app/vote/page.tsx`
- **Styling**: Customize colors and animations in `tailwind.config.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
