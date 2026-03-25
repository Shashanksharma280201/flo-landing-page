# Deployment Guide for Vercel

This guide will walk you through deploying the Flo Mobility landing page to Vercel.

## Pre-Deployment Checklist

✅ **Build successful locally** - Run `npm run build` to ensure no errors
✅ **Environment variables configured** - `.env.local` created with `DB_URI`
✅ **MongoDB database ready** - Have your MongoDB Atlas connection string
✅ **Code committed to Git** - All changes committed and pushed to GitHub

## Step-by-Step Vercel Deployment

### 1. Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account (if you don't have one)
3. Create a new cluster (free tier M0 is sufficient)
4. Create a database user with password
5. Add IP whitelist: `0.0.0.0/0` (allow from anywhere)
6. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```

### 2. Push to GitHub

```bash
git add .
git commit -m "feat: complete homepage redesign with scroll animations"
git push origin main
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

5. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add variable:
     - **Name:** `DB_URI`
     - **Value:** Your MongoDB connection string
     - **Environment:** Production, Preview, Development (select all)
   - Click **"Add"**

6. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add DB_URI
# Paste your MongoDB connection string when prompted
# Select: Production, Preview, Development

# Deploy to production
vercel --prod
```

### 4. Post-Deployment Configuration

1. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Environment Variables:**
   - Verify in Settings → Environment Variables
   - Ensure `DB_URI` is set for all environments

3. **Performance:**
   - Vercel automatically enables:
     - Edge caching
     - Image optimization
     - Automatic HTTPS
     - Global CDN

### 5. Verify Deployment

Visit your deployment URL and check:

- ✅ Homepage loads correctly
- ✅ Video plays in hero section
- ✅ Scroll animations work in solutions section
- ✅ Customer/Believer cards scroll smoothly
- ✅ Navigation works
- ✅ All images load
- ✅ Blog page works (requires DB connection)

## Troubleshooting

### Build Fails with "DB_URI not defined"

**Solution:** Add `DB_URI` environment variable in Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add `DB_URI` with your MongoDB connection string
3. Redeploy

### Images Not Loading

**Solution:** Ensure all images are in `/public` folder:
```bash
/public
  /customers
  /believers
  /mmr-images
  hero-video.mp4
  logo.webp
```

### Scroll Animations Not Working

**Solution:** Verify Framer Motion is installed:
```bash
npm install framer-motion
```

### MongoDB Connection Errors

**Solution:** Check MongoDB connection string:
1. Ensure username/password are correct
2. Verify IP whitelist includes `0.0.0.0/0`
3. Check database name in connection string

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_URI` | MongoDB connection for blog system | `mongodb+srv://user:pass@cluster.mongodb.net/db` |

## Deployment URLs

After deployment, your site will be available at:

- **Production:** `https://your-project.vercel.app`
- **Preview (branch):** `https://your-project-git-branch.vercel.app`
- **Custom Domain:** `https://yourdomain.com` (if configured)

## Continuous Deployment

Vercel automatically:
- ✅ Deploys on every push to `main` branch (production)
- ✅ Creates preview deployments for pull requests
- ✅ Runs build checks before deployment
- ✅ Invalidates cache on new deployments

## Support

For issues:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review [Vercel Docs](https://vercel.com/docs)
3. Contact Flo Mobility team

## Next Steps

After successful deployment:
1. Test all pages and features
2. Set up custom domain
3. Configure analytics (Vercel Analytics)
4. Enable monitoring (Vercel Monitoring)
5. Set up automated backups for MongoDB
