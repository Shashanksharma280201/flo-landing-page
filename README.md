# Flo Mobility Landing Page

This is a [Next.js](https://nextjs.org) project for Flo Mobility's corporate website, featuring autonomous robotics solutions.

## Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database (optional - only for blog functionality)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd flo-landing-page
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables (Optional - for blog functionality)

If you want to use the blog feature, copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your MongoDB connection string:

```env
DB_URI=your_mongodb_connection_string
```

**Note:**
- You can get a free MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- The site will run without `DB_URI`, but blog pages will show no posts

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── sections/    # Page sections (Hero, RaaS, Customers, etc.)
│   │   ├── shared/      # Shared components (Navbar, Footer, etc.)
│   │   └── ui/          # UI components
│   ├── lib/             # Utility functions and constants
│   └── hooks/           # Custom React hooks
├── public/              # Static assets (images, videos, fonts)
└── .env.local          # Environment variables (not committed)
```

## Features

- ✅ Autonomous robotics solutions showcase
- ✅ Full-width responsive design
- ✅ Video backgrounds with optimized loading
- ✅ Scroll-based animations using Framer Motion
- ✅ Blog system with MongoDB integration
- ✅ Contact forms with server actions
- ✅ Career and channel partner pages

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Deployment Steps:

1. **Push your code to GitHub**

2. **Import project to Vercel:**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure environment variables:**
   - In Vercel dashboard, go to: Settings → Environment Variables
   - Add the following variable:
     ```
     DB_URI = your_mongodb_connection_string
     ```

4. **Deploy:**
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

### Important Notes for Vercel:

- ✅ The project is already optimized for Vercel deployment
- ✅ All static assets are in the `/public` folder
- ✅ Environment variables are properly configured
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next`
- ✅ Next.js 16 with Turbopack enabled

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URI` | MongoDB connection string | Optional (blog only) |

**Note:** The site builds and runs without `DB_URI`. Blog pages will show "no posts" if database is not configured.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Support

For issues or questions, please contact the Flo Mobility team.
