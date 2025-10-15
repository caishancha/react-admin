import {
  getScrollbarWidth,
  needsScrollbar,
} from '@react-admin-core/shared/utils';

import {
  useScrollLock as _useScrollLock,
  useMount,
  useUnmount,
} from '@reactuses/core';

export const SCROLL_FIXED_CLASS = `_scroll__fixed_`;

export function useScrollLock() {
  const [, setLocked] = _useScrollLock(document.body);
  const scrollbarWidth = getScrollbarWidth();

  useMount(() => {
    if (!needsScrollbar()) {
      return;
    }
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const layoutFixedNodes = document.querySelectorAll<HTMLElement>(
      `.${SCROLL_FIXED_CLASS}`,
    );
    const nodes = [...layoutFixedNodes];
    if (nodes.length > 0) {
      nodes.forEach(node => {
        node.dataset.transition = node.style.transition;
        node.style.transition = 'none';
        node.style.paddingRight = `${scrollbarWidth}px`;
      });
    }
    setLocked(true);
  });

  useUnmount(() => {
    if (!needsScrollbar()) {
      return;
    }
    setLocked(false);
    const layoutFixedNodes = document.querySelectorAll<HTMLElement>(
      `.${SCROLL_FIXED_CLASS}`,
    );
    const nodes = [...layoutFixedNodes];
    if (nodes.length > 0) {
      nodes.forEach(node => {
        node.style.paddingRight = '';
        requestAnimationFrame(() => {
          node.style.transition = node.dataset.transition || '';
        });
      });
    }
    document.body.style.paddingRight = '';
  });
}
