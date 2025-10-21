import { useEffect, useRef, useState } from 'react';
import type { BacktopProps } from './backtop';

import { useEventListener, useThrottleFn } from '@reactuses/core';

export const useBackTop = (props: BacktopProps) => {
  const el = useRef<HTMLElement>(null);
  const container = useRef<Document | HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (el.current) {
      setVisible(el.current.scrollTop >= (props?.visibilityHeight ?? 0));
    }
  };

  const handleClick = () => {
    el.current?.scrollTo({ behavior: 'smooth', top: 0 });
  };

  const { run } = useThrottleFn(handleScroll, 300, true);

  useEventListener('scroll', run, container);
  useEffect(() => {
    container.current = document;
    el.current = document.documentElement;

    if (props.target) {
      el.current =
        document.querySelector<HTMLElement>(props.target)! ?? undefined;

      if (!el.current) {
        throw new Error(`target does not exist: ${props.target}`);
      }
      container.current = el.current;
    }
    handleScroll();
  }, []);

  return {
    handleClick,
    visible,
  };
};
