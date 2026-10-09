/** Spokes round the ring: one every 5°. */
export const SLOTS = 72;

export interface Run<K extends string> {
  key: K;
  /** The slot the run starts at, 0 at the top, clockwise. */
  start: number;
  /** Its spokes. */
  n: number;
}

/**
 * Each level with any gets a run of spokes by largest remainder, so the runs fill the ring exactly;
 * a level with any at all gets at least one spoke. Runs are one empty slot apart when there are
 * several, so neighbouring levels never touch; levels with none get no run.
 */
export function tickRuns<K extends string>(levels: readonly { key: K; count: number }[], slots = SLOTS): Run<K>[] {
  const live = levels.filter((l) => l.count > 0);
  if (!live.length) return [];
  const gap = live.length > 1 ? 1 : 0;
  const room = slots - gap * live.length;
  const total = live.reduce((a, l) => a + l.count, 0);
  const exact = live.map((l) => (l.count / total) * room);
  const n = exact.map((x) => Math.max(1, Math.floor(x)));
  let left = room - n.reduce((a, b) => a + b, 0);
  const byRemainder = exact.map((x, i) => ({ i, r: x - n[i] })).sort((a, b) => b.r - a.r || a.i - b.i);
  for (let k = 0; left > 0; k = (k + 1) % byRemainder.length, left--) n[byRemainder[k].i]++;
  for (; left < 0; left++) n[n.indexOf(Math.max(...n))]--;
  let at = 0;
  return live.map((l, i) => {
    const run = { key: l.key, start: at, n: n[i] };
    at += n[i] + gap;
    return run;
  });
}

/** A spoke's ends in a 200-unit box at slot `i`. Spokes alternate long and short, as a dial's marks
 *  do: all end on the ring's outer edge; the long ones reach further in. */
export const OUTER = 96;
export const INNER_LONG = 72;
export const INNER_SHORT = 81;
export function spoke(i: number, slots = SLOTS) {
  const a = (i / slots) * 2 * Math.PI - Math.PI / 2;
  const at = (r: number) => ({ x: +(100 + r * Math.cos(a)).toFixed(2), y: +(100 + r * Math.sin(a)).toFixed(2) });
  const p = at(i % 2 === 0 ? INNER_LONG : INNER_SHORT), q = at(OUTER);
  return { x1: p.x, y1: p.y, x2: q.x, y2: q.y };
}

/** The slot (fractional, 0 at the top, clockwise) a point in the 200-unit box points at, and its
 *  distance from the middle. */
export function pointAt(x: number, y: number, slots = SLOTS) {
  const a = (Math.atan2(y - 100, x - 100) + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
  return { slot: (a / (2 * Math.PI)) * slots, radius: Math.hypot(x - 100, y - 100) };
}

/** Slots apart, the short way round. */
const apart = (a: number, b: number, slots: number) => {
  const d = Math.abs(a - b) % slots;
  return Math.min(d, slots - d);
};

/** The run a slot belongs to: the one it falls in, else (an empty slot between runs) the nearer. */
export function runAt<K extends string>(runs: readonly Run<K>[], slot: number, slots = SLOTS): Run<K> | null {
  let best: Run<K> | null = null;
  let bestD = Infinity;
  for (const r of runs) {
    const first = r.start, last = r.start + r.n - 1;
    const inside = apart(slot, (first + last) / 2, slots) <= (last - first) / 2 + 0.5;
    const d = inside ? 0 : Math.min(apart(slot, first, slots), apart(slot, last, slots));
    if (d < bestD) { best = r; bestD = d; }
  }
  return best;
}

/** The Dock: how much a spoke grows with the pointer at slot `at`. Most (MAGNIFY) on the spoke
 *  under it, falling away as a bell over the few either side, as the macOS Dock's icons do. */
export const MAGNIFY = 1.176;
const SPREAD = 2.2;
export function magnify(i: number, at: number | null, slots = SLOTS) {
  if (at === null) return 1;
  const d = apart(i, at, slots);
  return d > 3 * SPREAD ? 1 : 1 + (MAGNIFY - 1) * Math.exp(-(d * d) / (2 * SPREAD * SPREAD));
}
