import { useCallback } from 'react';
import { createBreakpoint } from 'react-use';
import {
  DEFAULT_TAILWINDCSS_SM,
  DEFAULT_TAILWINDCSS_MD,
  DEFAULT_TAILWINDCSS_LG,
  DEFAULT_TAILWINDCSS_XL,
  DEFAULT_TAILWINDCSS_2XL,
} from '@react-admin-core/shared/constants';

type Breakpoint = keyof typeof breakpoints;

// 获取根元素（html）的 font-size 计算值（单位：px）
const rootFontSize = parseFloat(
  getComputedStyle(document.documentElement).fontSize,
);

// tailwindcss 默认断点配置
const breakpoints = {
  sm: DEFAULT_TAILWINDCSS_SM * rootFontSize,
  md: DEFAULT_TAILWINDCSS_MD * rootFontSize,
  lg: DEFAULT_TAILWINDCSS_LG * rootFontSize,
  xl: DEFAULT_TAILWINDCSS_XL * rootFontSize,
  '2xl': DEFAULT_TAILWINDCSS_2XL * rootFontSize,
};

const useBreakpoint = createBreakpoint(breakpoints);

// 断点顺序数组，用于比较断点大小
const breakpointOrder = Object.keys(breakpoints) as Breakpoint[];

/**
 * 获取断点在顺序数组中的索引
 */
const getBreakpointIndex = (bp: Breakpoint | string): number => {
  return breakpointOrder.indexOf(bp as Breakpoint);
};

export function useBreakPoints() {
  const breakpoint = useBreakpoint();

  const smaller = useCallback(
    (k: Breakpoint) => {
      const currentIndex = getBreakpointIndex(breakpoint);
      const targetIndex = getBreakpointIndex(k);
      return (
        currentIndex !== -1 && targetIndex !== -1 && currentIndex < targetIndex
      );
    },
    [breakpoint],
  );

  const greaterOrEqual = useCallback(
    (k: Breakpoint) => {
      const currentIndex = getBreakpointIndex(breakpoint);
      const targetIndex = getBreakpointIndex(k);
      return (
        currentIndex !== -1 && targetIndex !== -1 && currentIndex >= targetIndex
      );
    },
    [breakpoint],
  );

  const smallerOrEqual = useCallback(
    (k: Breakpoint) => {
      const currentIndex = getBreakpointIndex(breakpoint);
      const targetIndex = getBreakpointIndex(k);
      return (
        currentIndex !== -1 && targetIndex !== -1 && currentIndex <= targetIndex
      );
    },
    [breakpoint],
  );

  const greater = useCallback(
    (k: Breakpoint) => {
      const currentIndex = getBreakpointIndex(breakpoint);
      const targetIndex = getBreakpointIndex(k);
      return (
        currentIndex !== -1 && targetIndex !== -1 && currentIndex > targetIndex
      );
    },
    [breakpoint],
  );
  const between = useCallback(
    (min: Breakpoint, max: Breakpoint) => {
      const currentIndex = getBreakpointIndex(breakpoint);
      const minIndex = getBreakpointIndex(min);
      const maxIndex = getBreakpointIndex(max);
      return (
        currentIndex !== -1 &&
        minIndex !== -1 &&
        maxIndex !== -1 &&
        currentIndex >= minIndex &&
        currentIndex <= maxIndex
      );
    },
    [breakpoint],
  );

  const isGreater = useCallback((k: Breakpoint) => greater(k), [greater]);
  const isGreaterOrEqual = useCallback(
    (k: Breakpoint) => greaterOrEqual(k),
    [greaterOrEqual],
  );
  const isSmallerOrEqual = useCallback(
    (k: Breakpoint) => smallerOrEqual(k),
    [smallerOrEqual],
  );
  const isSmaller = useCallback((k: Breakpoint) => smaller(k), [smaller]);
  const isInBetween = useCallback(
    (min: Breakpoint, max: Breakpoint) => between(min, max),
    [between],
  );
  const current = useCallback(() => {
    return breakpoint;
  }, [breakpoint]);
  const active = useCallback(() => {
    const currentIndex = getBreakpointIndex(breakpoint);
    if (currentIndex === -1) return [];
    return breakpointOrder.slice(currentIndex);
  }, [breakpoint]);

  return {
    greater,
    greaterOrEqual,
    smallerOrEqual,
    smaller,
    between,
    isGreater,
    isGreaterOrEqual,
    isSmallerOrEqual,
    isSmaller,
    isInBetween,
    current,
    active,
  };
}
