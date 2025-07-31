# Vercel Deployment Guide

## Quick Deployment Steps

### 1. Prepare your repository
```bash
git add .
git commit -m "Initial mess rating system setup"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your repository
4. Choose Next.js framework (should be detected automatically)

### 3. Set Environment Variables in Vercel
In the Vercel dashboard, go to your project settings and add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your_random_secret_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Update Google OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client ID
3. Add your Vercel domain to:
   - **Authorized JavaScript origins**: `https://your-vercel-domain.vercel.app`
   - **Authorized redirect URIs**: `https://your-vercel-domain.vercel.app/api/auth/callback/google`

### 5. Deploy
Click "Deploy" in Vercel. Your app will be live in a few minutes!

## Automatic Deployments
- Every push to your main branch will automatically trigger a new deployment
- Preview deployments are created for pull requests

## Custom Domain (Optional)
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update the environment variables and Google OAuth settings with your custom domain

## Monitoring
- Check the "Functions" tab in Vercel for API route logs
- Monitor performance in the "Analytics" tab
- Check deployment logs in the "Deployments" tab

## Environment Variables Checklist
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY  
- [ ] NEXTAUTH_URL (must match your Vercel domain)
- [ ] NEXTAUTH_SECRET (generate a secure random string)
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET

## Troubleshooting
- **OAuth errors**: Check that redirect URIs match exactly
- **Database errors**: Verify Supabase URL and API key
- **Build errors**: Check the build logs in Vercel
- **Authentication issues**: Ensure NEXTAUTH_URL matches your domain
