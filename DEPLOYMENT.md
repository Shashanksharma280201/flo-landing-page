# Deployment Guide for Vercel

## Build Status
✅ Build successful (15MB output)
✅ All pages generated successfully
✅ TypeScript compilation passed

## Required Environment Variables

Add these environment variables in your Vercel project settings:

### MongoDB (Required for Blog Feature)
```
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Email Configuration (Required for Contact Forms)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECEIVER_EMAIL=contact@flomobility.com
SENDER_EMAIL=noreply@flomobility.com
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Vercel

#### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables (see above)
5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Configure Environment Variables in Vercel
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add all the variables listed above
4. Redeploy if necessary

## Important Notes

### Database Connection
- The build will succeed without `DB_URI` set
- Blog pages will show "no posts" message when DB is not connected
- Make sure to set `DB_URI` in Vercel for blog functionality

### Email Configuration
- Contact forms require SMTP configuration
- Use app-specific passwords for Gmail (not your regular password)
- Test email delivery after deployment

### Pages Generated
- `/` - Home page
- `/about` - About page
- `/contact` - Contact form
- `/blogs` - Blog listing (requires DB)
- `/blogs/[slug]` - Blog posts (requires DB)
- `/careers` - Careers page
- `/channel-partner` - Partner form
- `/offerings/material-movement` - Product page
- `/offerings/lawn-maintenance` - Product page
- `/offerings/fleet-control` - Product page

### Performance
- Build size: ~15MB
- All pages are statically generated
- Blog page has ISR with 1-minute revalidation

## Troubleshooting

### If blog pages are empty
- Check that `DB_URI` is correctly set in Vercel
- Verify MongoDB connection string is valid
- Check MongoDB network access allows Vercel IPs

### If contact forms aren't working
- Verify all SMTP environment variables are set
- Check SMTP credentials are correct
- Enable "Less secure app access" for Gmail (or use app password)

### Build failures
- Ensure all dependencies are in `package.json`
- Check that Node.js version is compatible (v18 or higher recommended)

## Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Test navigation between pages
- [ ] Verify contact form sends emails
- [ ] Check blog pages load (if DB is configured)
- [ ] Test responsive design on mobile
- [ ] Verify all images load properly
- [ ] Check social media links work
- [ ] Test all offering pages
