import { useMediaQuery } from '@reactuses/core';

export function useBreakPoints() {
  // tailwindcss 默认断点配置
  const breakpoints = {
    sm: useMediaQuery('(min-width: 40rem)'),
    md: useMediaQuery('(min-width: 48rem)'),
    lg: useMediaQuery('(min-width: 64rem)'),
    xl: useMediaQuery('(min-width: 80rem)'),
    '2xl': useMediaQuery('(min-width: 96rem)'),
  };

  const active = () =>
    Object.keys(breakpoints)
      .reverse()
      .find(key => breakpoints[key as keyof typeof breakpoints] || '');

  return {
    ...breakpoints,
    active,
  };
}
