export type Level = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Item {
  level: Level;
  label: string;
  count: number;
  /** CSS colour, for the ring and the legend marks. */
  color: string;
  /** The same colour in sRGB hex, for the pie (ECharts draws on a canvas). */
  hex: string;
}

/** Most severe first: the ring runs clockwise from the top in this order, and so does the pie. */
export const LEVELS: Item[] = [
  { level: 'critical', label: 'Critical', count: 96, color: 'var(--sev-critical)', hex: '#ea001a' },
  { level: 'high', label: 'High', count: 168, color: 'var(--sev-high)', hex: '#da6600' },
  { level: 'medium', label: 'Medium', count: 231, color: 'var(--sev-medium)', hex: '#ffc845' },
  { level: 'low', label: 'Low', count: 187, color: 'var(--sev-low)', hex: '#009e48' },
  { level: 'info', label: 'Informational', count: 142, color: 'var(--sev-info)', hex: '#00979d' },
];

export const TOTAL = LEVELS.reduce((a, l) => a + l.count, 0); // 824

/** sRGB hex of the dark tokens, for ECharts. */
export const HEX = { background: '#07080a', card: '#101215', border: '#21242a', foreground: '#f4f5f7' };
