import { useLayoutEffect, useRef } from 'react';

/**
 * Eases an element's width to its content's: 150ms on cubic-bezier(0.25, 1, 0.5, 1), through the
 * element's own `transition: width`. Put `outer` on the element and `inner` on a span that wraps ALL
 * of its content (inline-flex, width: max-content). The width is set as --morph-w. The first
 * measurement lands without easing (auto → a length doesn't transition).
 */
export function useMorphWidth<T extends HTMLElement = HTMLDivElement>() {
  const outer = useRef<T | null>(null);
  const inner = useRef<HTMLSpanElement | null>(null);
  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const ro = new ResizeObserver(([entry]) => {
      const content = entry?.borderBoxSize?.[0]?.inlineSize ?? i.offsetWidth;
      if (!content) { o.style.removeProperty('--morph-w'); return; }
      const cs = getComputedStyle(o);
      const chrome = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
        + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
      o.style.setProperty('--morph-w', `${Math.ceil(content + chrome)}px`);
    });
    ro.observe(i);
    return () => ro.disconnect();
  }, []);
  return { outer, inner };
}
