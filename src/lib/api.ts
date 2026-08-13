const RAW = (process.env.NEXT_PUBLIC_MISSION_CONTROL_API_URL ?? '').replace(/\/$/, '');

// Without a host the form URLs go relative, which the static S3 export answers with
// a 403 rather than a routing error. Fail the build instead of shipping that.
if (!RAW && process.env.NODE_ENV === 'production') {
  throw new Error(
    'NEXT_PUBLIC_MISSION_CONTROL_API_URL is unset. Set it in .env.production or the CI build env.',
  );
}

export const API_BASE = RAW;

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
