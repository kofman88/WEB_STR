import { useMemo, useState } from 'react';

export function useHeroWheel(items: string[]) {
  const [active, setActive] = useState(0);
  const rotate = (dir: 1 | -1) => setActive((p) => (p + dir + items.length) % items.length);
  const wheel = useMemo(() => items.map((name, i) => ({ name, i, active: i === active })), [items, active]);
  return { active, setActive, rotate, wheel };
}
