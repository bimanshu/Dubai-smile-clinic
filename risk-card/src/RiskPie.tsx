import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { HEX, type Item } from './data';
import { formatCount, shareText } from './format';

/** `levels`: the levels with any (a level with none isn't in the chart: minAngle would still draw
 *  it as a 4° sliver). */
function Donut({ levels }: { levels: Item[] }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!el.current) return;
    const chart = echarts.init(el.current, null, { renderer: 'canvas' });
    chart.setOption({
      tooltip: {
        trigger: 'item',
        backgroundColor: HEX.card,
        borderColor: HEX.border,
        borderWidth: 1,
        padding: [6, 10],
        extraCssText: 'border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,0.18);',
        textStyle: { color: HEX.foreground, fontSize: 12 },
        formatter: (p: unknown) => {
          const q = p as { name: string; value: number; percent: number };
          return `${q.name}<br/><b>${formatCount(Number(q.value))}</b> · ${q.percent}%`;
        },
      },
      series: [
        {
          type: 'pie',
          // The intro: here, on the series, where the pie reads them.
          animation: true,
          animationDuration: 600,
          animationEasing: 'cubicOut',
          animationDurationUpdate: 300,
          cursor: 'default',
          radius: ['52%', '75%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: true,
          padAngle: 0.8,
          minAngle: 4,
          itemStyle: { borderColor: HEX.background, borderWidth: 1.5, borderRadius: 4 },
          label: { show: false },
          labelLine: { show: false },
          emphasis: { scale: true, scaleSize: 6, itemStyle: { shadowBlur: 14, shadowColor: 'rgba(0,0,0,0.32)' } },
          data: levels.map((l) => ({ name: l.label, value: l.count, itemStyle: { color: l.hex } })),
        },
      ],
    });
    // Skip the observer's first report (it fires at once, and a resize would end the intro).
    let first = true;
    const ro = new ResizeObserver(() => { if (first) { first = false; return; } chart.resize(); });
    ro.observe(el.current);
    return () => { ro.disconnect(); chart.dispose(); };
  }, [levels]);
  return <div ref={el} className="pie-canvas" />;
}

export function RiskPieCard({ levels, total }: { levels: Item[]; total: number }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Risk Distribution</div>
        <div className="card-desc">Users and entities with a risk score, now</div>
      </div>
      <div className="card-content pie-content">
        <div className="pie">
          <Donut levels={levels.filter((l) => l.count > 0)} />
          {/* The total in the hole; the legend below says the same level by level. */}
          <div aria-hidden="true" className="center">
            <span className="total">{formatCount(total)}</span>
            <span className="total-sub">users &amp; entities</span>
          </div>
        </div>
        <ul aria-label="Users and entities by risk level" className="legend legend-pie">
          {levels.filter((l) => l.count > 0).map((l) => (
            <li key={l.level}>
              <span aria-hidden="true" className="mark" style={{ background: l.color }} />
              {l.label}
              <span className="count">{formatCount(l.count)}</span>
              <span className="share"><span className="sr-only">, </span>{shareText(l.count, total)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
