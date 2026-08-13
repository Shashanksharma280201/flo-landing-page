export type AnalyticsEventName =
  | 'generate_lead'
  | 'file_download'
  | 'click'
  | 'video_start'
  | 'video_complete'
  | 'search'
  | 'scroll'
  | 'select_content';

export interface AnalyticsEventParams {
  value?: number;
  currency?: string;
  file_name?: string;
  file_extension?: string;
  link_url?: string;
  outbound?: boolean;
  video_title?: string;
  video_url?: string;
  video_duration?: number;
  search_term?: string;
  percent_scrolled?: number;
  content_type?: string;
  item_id?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: 'event' | 'config' | 'js',
      eventNameOrTarget: string | Date,
      params?: AnalyticsEventParams,
    ) => void;
  }
}

const cleanString = (value: string) => value.trim().toLowerCase();

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const cleanParams = Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [
        key,
        typeof value === 'string' ? cleanString(value) : value,
      ]),
  ) as AnalyticsEventParams;

  window.gtag('event', eventName, cleanParams);
}

export function trackLead(formType: string, value?: number) {
  trackEvent('generate_lead', {
    form_type: formType,
    value,
  });
}

export function trackNavSelect(itemId: string, contentType = 'navigation_link') {
  trackEvent('select_content', {
    content_type: contentType,
    item_id: itemId,
  });
}

export function trackVideoStart({
  title,
  url,
  duration = 0,
}: {
  title: string;
  url: string;
  duration?: number;
}) {
  trackEvent('video_start', {
    video_title: title,
    video_url: url,
    video_duration: duration,
  });
}

export function youtubeUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
