import type { Lang } from '../i18n/ui';

/** "19:00" -> "7 pm" (en) or "7 م" (ar). Latin digits are standard in the UAE. */
export function formatTime(hhmm: string, lang: Lang) {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = ((h + 11) % 12) + 1;
  const mins = m ? `:${String(m).padStart(2, '0')}` : '';
  if (lang === 'ar') return `${h12}${mins} ${h < 12 ? 'ص' : 'م'}`;
  return `${h12}${mins} ${h < 12 ? 'am' : 'pm'}`;
}
