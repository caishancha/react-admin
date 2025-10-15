import { useBreakPoints } from './use-break-points';

export function useIsMobile() {
  const breakpoints = useBreakPoints();
  const isMobile = breakpoints.md;

  return {
    isMobile,
  };
}
