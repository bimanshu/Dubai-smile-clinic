import { LEVELS, TOTAL } from './data';
import { RiskRingCard } from './RiskRing';

export default function App() {
  return (
    <main className="stage">
      <RiskRingCard levels={LEVELS} total={TOTAL} />
    </main>
  );
}
