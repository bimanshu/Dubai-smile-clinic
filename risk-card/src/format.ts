/** A count: whole numbers with thousands separators below 10,000, then K / M / B to two decimals. */
export function formatCount(n: number): string {
  const sign = n < 0 ? '-' : '';
  const v = Math.abs(n);
  if (v < 10_000) return sign + Math.round(v).toLocaleString('en-US');
  for (const [t, s] of [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']] as const) {
    if (v >= t) return sign + (v / t).toFixed(2).replace(/\.?0+$/, '') + s;
  }
  return sign + String(v);
}

/** A share in the legend: the nearest whole percent, but "<1%" for a share that isn't zero and
 *  ">99%" for one that isn't all. Zero prints nothing (the count already says 0). */
export function shareText(n: number, d: number): string | null {
  if (!n || !d || !Number.isFinite(n / d)) return null;
  const r = n / d;
  if (r >= 1) return '100%';
  if (r < 0.005) return '<1%';
  if (r >= 0.995) return '>99%';
  return `${Math.round(r * 100)}%`;
}

/** The tooltip's percent: two decimals at most (11.65%, 50%), as ECharts prints a pie's. */
export const percent = (n: number, total: number) => (total > 0 ? Number(((n / total) * 100).toFixed(2)) : 0);
