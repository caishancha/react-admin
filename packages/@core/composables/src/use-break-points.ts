import { useMedia } from 'react-use';

export function useBreakPoints() {
  // tailwindcss 默认断点配置
  const breakpoints = {
    sm: useMedia('(min-width: 40rem)'),
    md: useMedia('(min-width: 48rem)'),
    lg: useMedia('(min-width: 64rem)'),
    xl: useMedia('(min-width: 80rem)'),
    '2xl': useMedia('(min-width: 96rem)'),
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
