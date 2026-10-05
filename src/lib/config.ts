/**
 * Demo mode is ON unless PUBLIC_DEMO=false. While it's on:
 * - a "design preview" strip sits above the nav,
 * - search engines are told not to index the page (meta robots + robots.txt),
 * - the booking form says requests aren't sent (and it never sends anything).
 * Turn it off for launch, together with PUBLIC_BOOKING_ENDPOINT.
 */
export const DEMO = import.meta.env.PUBLIC_DEMO !== 'false';
export const BOOKING_ENDPOINT = DEMO ? '' : (import.meta.env.PUBLIC_BOOKING_ENDPOINT ?? '');
