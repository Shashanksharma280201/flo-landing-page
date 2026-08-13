'use client';

import Script from 'next/script';

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { 'debug_mode': ${isDev} });
        `}
      </Script>
    </>
  );
}
