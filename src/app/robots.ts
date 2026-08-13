import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://flomobility.com/sitemap.xml',
    host: 'https://flomobility.com',
  };
}
