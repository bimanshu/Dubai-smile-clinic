import { LEVELS, TOTAL } from './data';
import { RiskPieCard } from './RiskPie';
import { RiskRingCard } from './RiskRing';

export default function App() {
  return (
    <main className="stage">
      <figure>
        <figcaption>Before</figcaption>
        <RiskPieCard levels={LEVELS} total={TOTAL} />
      </figure>
      <figure>
        <figcaption>After</figcaption>
        <RiskRingCard levels={LEVELS} total={TOTAL} />
      </figure>
    </main>
  );
}
