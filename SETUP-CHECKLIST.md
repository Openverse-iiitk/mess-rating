# Setup Checklist

Follow this checklist to ensure everything is properly configured:

## ✅ Environment Variables Check

Your `.env.local` file should contain all these variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3001 (or your domain)
NEXTAUTH_SECRET=your_secure_random_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_google_client_secret
```

## ✅ Google OAuth Configuration

1. **Google Cloud Console Setup:**
   - [ ] Project created in Google Cloud Console
   - [ ] OAuth 2.0 Client ID created
   - [ ] JavaScript origins: `http://localhost:3001`
   - [ ] Redirect URIs: `http://localhost:3001/api/auth/callback/google`

2. **Domain Restriction:**
   - [ ] Only @iiitkottayam.ac.in emails are allowed (handled in code)

## ✅ Supabase Database Setup

1. **Tables Created:**
   - [ ] `user_profiles` table
   - [ ] `ratings` table  
   - [ ] `menu_items` table

2. **Run this SQL in Supabase SQL Editor:**
   ```sql
   -- Copy and paste the contents of database/setup.sql
   ```

3. **Verify Tables:**
   - [ ] All tables have Row Level Security enabled
   - [ ] Policies are created and working
   - [ ] Sample menu items are inserted

## ✅ Testing Checklist

### Authentication Flow
- [ ] Can access home page at `localhost:3001`
- [ ] "Sign in with Google" button works
- [ ] Only @iiitkottayam.ac.in emails can sign in
- [ ] Other emails are rejected with appropriate message
- [ ] After successful login, redirected to `/vote` page

### Rating System
- [ ] Dish cards load properly with meteors animation
- [ ] Sliders work and show current rating
- [ ] Can submit ratings successfully
- [ ] After rating, shows "✓ You've rated this dish"
- [ ] Average ratings display correctly
- [ ] Can't rate the same dish twice on the same day

### UI Components
- [ ] Background gradient displays correctly
- [ ] Pointer highlight works on main heading
- [ ] Typewriter effect shows dish names properly
- [ ] Meteors animation works on cards
- [ ] Responsive design works on mobile

## ✅ Race Condition Prevention

The following measures prevent authentication/database race conditions:

1. **Session Status Checking:**
   - [ ] Components wait for authentication status before loading data
   - [ ] Loading states show while fetching data
   - [ ] Error handling for failed requests

2. **Database Operations:**
   - [ ] Using `maybeSingle()` instead of `single()` to avoid errors
   - [ ] Proper error handling for all database operations
   - [ ] Concurrent data fetching with `Promise.all()`

3. **State Management:**
   - [ ] Proper loading states
   - [ ] Error states with user-friendly messages
   - [ ] Disabled states during submissions

## ✅ Performance Optimizations

- [ ] Using `useCallback` for expensive operations
- [ ] Concurrent data fetching where possible
- [ ] Proper database indexing
- [ ] Optimized re-renders with proper dependencies

## 🚨 Troubleshooting

### Common Issues:

1. **"Failed to load your rating"**
   - Check Supabase connection
   - Verify table exists and policies are correct

2. **"Sign in failed"**
   - Check Google OAuth configuration
   - Verify redirect URIs match exactly

3. **Blank page after sign in**
   - Check console for errors
   - Verify NextAuth configuration

4. **Database errors**
   - Check if tables exist in Supabase
   - Run the setup SQL script
   - Verify Row Level Security policies

### Development Server
- [ ] Running on `http://localhost:3001`
- [ ] Hot reload working
- [ ] No console errors

## 🚀 Ready for Production

When all items are checked, your mess rating system is ready for deployment to Vercel!
