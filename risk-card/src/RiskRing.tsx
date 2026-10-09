import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { Item, Level } from './data';
import { formatCount, percent, shareText } from './format';
import { magnify, pointAt, runAt, spoke, tickRuns } from './ticks';
import { useMorphWidth } from './useMorphWidth';

/** A legend row grows its whole level by 8%. */
const GROWN = 1.08;
/** The tooltip floats this far above the pointer, centred on it, wherever the pointer is. */
const OFFSET = 12;
/** The ring answers between these radii (of the 100-unit half box): from inside the long spokes'
 *  ends out past the grown spokes', so the total in the middle stays still to read. */
const NEAR = 60;
const FAR = 118;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The tooltip. Its width follows its words, so moving to another level eases the box; each changed
 *  word (the name, the count, the percent) comes in with a 2px blur and a fade, keyed so it replays. */
function RingTip({ label, count, total, x, y }: { label: string; count: number; total: number; x: number; y: number }) {
  const { outer, inner } = useMorphWidth<HTMLDivElement>();
  return (
    <div ref={outer} aria-hidden="true" className="ring-tip" style={{ left: x, top: y - OFFSET }}>
      <span ref={inner} className="ring-tip-inner">
        <span key={label} className="swap-in">{label}</span>
        <span>
          <b key={`n${count}`} className="swap-in">{formatCount(count)}</b>
          {' · '}
          <span key={`p${count}/${total}`} className="swap-in">{percent(count, total)}%</span>
        </span>
      </span>
    </div>
  );
}

interface Pointer { x: number; y: number; slot: number; level: Level }

export function RiskRing({ levels, total }: { levels: Item[]; total: number }) {
  const runs = tickRuns(levels.map((l) => ({ key: l.level, count: l.count })));
  const colorOf = (k: Level) => levels.find((l) => l.level === k)!.color;
  const box = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<Pointer | null>(null);
  const [dock, setDock] = useState(false);
  const [legendHot, setLegendHot] = useState<Level | null>(null);
  // One update a frame, however fast the pointer moves.
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const move = (e: PointerEvent) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = box.current?.getBoundingClientRect();
      if (!r || !r.width) return;
      const k = 200 / r.width;
      const p = pointAt((clientX - r.left) * k, (clientY - r.top) * k);
      const run = p.radius >= NEAR && p.radius <= FAR ? runAt(runs, p.slot) : null;
      if (!run) { setPointer(null); return; }
      setPointer({ x: clientX - r.left, y: clientY - r.top, slot: p.slot, level: run.key });
      setDock(!reducedMotion());
    });
  };
  const leave = () => { cancelAnimationFrame(frame.current); setPointer(null); };
  const tip = pointer && levels.find((l) => l.level === pointer.level);
  const at = pointer && dock ? pointer.slot : null;

  return (
    <div className="ring-box">
      <div ref={box} className="ring" onPointerMove={move} onPointerLeave={leave}>
        <div aria-hidden="true" className="ring-hit" />
        <svg viewBox="0 0 200 200" aria-hidden="true">
          {runs.map((run) => (
            <g key={run.key} stroke={colorOf(run.key)} strokeWidth={2.8} strokeLinecap="round"
               style={legendHot === run.key ? { scale: String(GROWN) } : undefined}>
              {Array.from({ length: run.n }, (_, i) => {
                const slot = run.start + i;
                const m = magnify(slot, at);
                return <line key={i} {...spoke(slot)} style={m === 1 ? undefined : { scale: m.toFixed(3) }} />;
              })}
            </g>
          ))}
        </svg>
        <div aria-hidden="true" className="center">
          <span className="total">{formatCount(total)}</span>
          <span className="total-sub">users and entities</span>
        </div>
        {tip && pointer && <RingTip label={tip.label} count={tip.count} total={total} x={pointer.x} y={pointer.y} />}
      </div>
      <ul aria-label={`Users and entities by risk level, ${formatCount(total)} in all`} className="legend legend-ring">
        {levels.map((l) => {
          const share = shareText(l.count, total);
          return (
            <li key={l.level}
                onPointerEnter={l.count ? () => setLegendHot(l.level) : undefined}
                onPointerLeave={l.count ? () => setLegendHot(null) : undefined}>
              <span aria-hidden="true" className="mark" style={{ background: l.color }} />
              <span className={l.count ? undefined : 'none'}>{l.label}</span>
              <span className={l.count ? 'count' : 'none'}>{formatCount(l.count)}</span>
              {share && <span className="share"><span className="sr-only">, </span>{share}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The whole card. */
export function RiskRingCard({ levels, total }: { levels: Item[]; total: number }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Risk Distribution</div>
        <div className="card-desc">Users and entities with a risk score, now</div>
      </div>
      <div className="card-content">
        <RiskRing levels={levels} total={total} />
      </div>
    </div>
  );
}
