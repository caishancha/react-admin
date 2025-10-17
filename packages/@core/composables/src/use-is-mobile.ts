import { useBreakPoints } from './use-break-points';

export function useIsMobile() {
  const breakpoints = useBreakPoints();
  const isMobile = breakpoints.smaller('md');

  return {
    isMobile,
  };
}
