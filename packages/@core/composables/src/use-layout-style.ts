import { useMemo, useRef, useState, type CSSProperties } from 'react';

import type { VisibleDomRect } from '@react-admin-core/shared/utils';

import {
  CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT,
  CSS_VARIABLE_LAYOUT_CONTENT_WIDTH,
  CSS_VARIABLE_LAYOUT_FOOTER_HEIGHT,
  CSS_VARIABLE_LAYOUT_HEADER_HEIGHT,
} from '@react-admin-core/shared/constants';
import { getElementVisibleRect } from '@react-admin-core/shared/utils';

import {
  useCssVar,
  useDebounceFn,
  useMount,
  useUnmount,
} from '@reactuses/core';

/**
 * @zh_CN content style
 */
export function useLayoutContentStyle() {
  let resizeObserver: null | ResizeObserver = null;
  const contentElement = useRef<HTMLDivElement | null>(null);
  const [visibleDomRect, setVisibleDomRect] = useState<null | VisibleDomRect>(
    null,
  );
  const [, setContentHeight] = useCssVar(
    CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT,
    contentElement.current,
  );
  const [, setContentWidth] = useCssVar(
    CSS_VARIABLE_LAYOUT_CONTENT_WIDTH,
    contentElement.current,
  );

  const overlayStyle = useMemo((): CSSProperties => {
    const { height, left, top, width } = visibleDomRect ?? {};
    return {
      height: `${height}px`,
      left: `${left}px`,
      position: 'fixed',
      top: `${top}px`,
      width: `${width}px`,
      zIndex: 150,
    };
  }, [visibleDomRect]);

  const { run } = useDebounceFn((_entries: ResizeObserverEntry[]) => {
    setVisibleDomRect(getElementVisibleRect(contentElement.current));
    setContentHeight(`${visibleDomRect!.height}px`);
    setContentWidth(`${visibleDomRect!.width}px`);
  }, 16);

  useMount(() => {
    if (contentElement.current && !resizeObserver) {
      resizeObserver = new ResizeObserver(run);
      resizeObserver.observe(contentElement.current);
    }
  });

  useUnmount(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
  });

  return {
    contentElement,
    overlayStyle,
    visibleDomRect,
  };
}

export function useLayoutHeaderStyle() {
  const headerElement = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useCssVar(
    CSS_VARIABLE_LAYOUT_HEADER_HEIGHT,
    headerElement.current,
  );

  return {
    headerElement,
    getLayoutHeaderHeight: () => {
      return Number.parseInt(`${headerHeight}`, 10);
    },
    setLayoutHeaderHeight: (height: number) => {
      setHeaderHeight(`${height}px`);
    },
  };
}

export function useLayoutFooterStyle() {
  const footerElement = useRef<HTMLDivElement | null>(null);
  const [footerHeight, setFooterHeight] = useCssVar(
    CSS_VARIABLE_LAYOUT_FOOTER_HEIGHT,
    footerElement.current,
  );

  return {
    footerElement,
    getLayoutFooterHeight: () => {
      return Number.parseInt(`${footerHeight}`, 10);
    },
    setLayoutFooterHeight: (height: number) => {
      setFooterHeight(`${height}px`);
    },
  };
}
