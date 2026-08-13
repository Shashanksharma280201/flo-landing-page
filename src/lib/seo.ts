import type { Metadata } from 'next';

export const SITE_URL = 'https://flomobility.com';
export const SITE_NAME = 'Flo Mobility';
export const DEFAULT_DESCRIPTION =
  "India's largest construction robotics company. Autonomous material movement robots and electric wheelbarrows that cut site costs. No capex.";
export const DEFAULT_OG_IMAGE = '/mmr-images/all-robots.avif';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export interface JsonLdObject {
  [key: string]: JsonLdValue;
}

export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [
      'FLO Mobility',
      'flo mobility',
      'flomobility',
      'flo-mobility',
      'FloMobility',
    ],
    url: SITE_URL,
    logo: absoluteUrl('/logo.webp'),
    description: DEFAULT_DESCRIPTION,
    foundingLocation: {
      '@type': 'Place',
      name: 'Bengaluru, India',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [
      'https://www.linkedin.com/company/flomobility/',
      'https://www.youtube.com/@flomobility',
      'https://www.instagram.com/flomobility/',
      'https://twitter.com/flomobility',
    ],
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

export function videoObjectJsonLd({
  name,
  description,
  uploadDate,
  thumbnailUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  uploadDate: string;
  thumbnailUrl: string;
  embedUrl?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    uploadDate,
    thumbnailUrl,
    ...(embedUrl ? { embedUrl } : {}),
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function newsArticleJsonLd({
  headline,
  datePublished,
  url,
  image,
  publisherName,
}: {
  headline: string;
  datePublished: string;
  url: string;
  image?: string;
  publisherName?: string;
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    datePublished,
    url,
    ...(image ? { image } : {}),
    ...(publisherName
      ? { publisher: { '@type': 'Organization', name: publisherName } }
      : {}),
    about: { '@id': `${SITE_URL}/#organization` },
  };
}
