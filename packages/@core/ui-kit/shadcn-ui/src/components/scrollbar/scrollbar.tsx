// import type { ClassType } from '@react-admin-core/typings';
// import type { ScrollAreaProps } from '@radix-ui/react-scroll-area';
// import { ScrollArea, ScrollBar } from '../../ui';
// import { useCallback, useMemo, useState } from 'react';
// import { cn } from '@react-admin-core/shared/utils';

// import styles from './scrollbar.module.css';

// interface Props {
//   className?: ClassType;
//   horizontal?: boolean;
//   scrollBarClass?: ClassType;
//   shadow?: boolean;
//   shadowBorder?: boolean;
//   shadowBottom?: boolean;
//   shadowLeft?: boolean;
//   shadowRight?: boolean;
//   shadowTop?: boolean;
//   scrollAt?: (scroll: {
//     bottom: boolean;
//     left: boolean;
//     right: boolean;
//     top: boolean;
//   }) => void;
// }

// const ARRIVED_STATE_THRESHOLD_PIXELS = 1;

// export const ScScrollbar = ({
//   className = '',
//   horizontal = false,
//   shadow = false,
//   shadowBorder = false,
//   shadowBottom = true,
//   shadowLeft = false,
//   shadowRight = false,
//   shadowTop = true,
//   ...props
// }: Props & ScrollAreaProps) => {
//   const [isAtTop, setIsAtTop] = useState(true);
//   const [isAtRight, setIsAtRight] = useState(false);
//   const [isAtBottom, setIsAtBottom] = useState(false);
//   const [isAtLeft, setIsAtLeft] = useState(true);

//   const showShadowTop = useMemo(() => shadow && shadowTop, [shadow, shadowTop]);
//   const showShadowBottom = useMemo(
//     () => shadow && shadowBottom,
//     [shadow, shadowBottom],
//   );
//   const showShadowLeft = useMemo(
//     () => shadow && shadowLeft,
//     [shadow, shadowLeft],
//   );
//   const showShadowRight = useMemo(
//     () => shadow && shadowRight,
//     [shadow, shadowRight],
//   );

//   const computedShadowClasses = useMemo(() => {
//     return {
//       'both-shadow':
//         !isAtLeft && !isAtRight && showShadowLeft && showShadowRight,
//       'left-shadow': !isAtLeft && showShadowLeft,
//       'right-shadow': !isAtRight && showShadowRight,
//     };
//   }, [isAtLeft, isAtRight, showShadowLeft, showShadowRight]);

//   const handleScroll = useCallback(
//     (event: Event) => {
//       const target = event.target as HTMLElement;
//       const scrollTop = target?.scrollTop ?? 0;
//       const scrollLeft = target?.scrollLeft ?? 0;
//       const clientHeight = target?.clientHeight ?? 0;
//       const clientWidth = target?.clientWidth ?? 0;
//       const scrollHeight = target?.scrollHeight ?? 0;
//       const scrollWidth = target?.scrollWidth ?? 0;

//       setIsAtTop(scrollTop <= 0);
//       setIsAtLeft(scrollLeft <= 0);
//       setIsAtBottom(
//         Math.abs(scrollTop) + clientHeight >=
//           scrollHeight - ARRIVED_STATE_THRESHOLD_PIXELS,
//       );
//       setIsAtRight(
//         Math.abs(scrollLeft) + clientWidth >=
//           scrollWidth - ARRIVED_STATE_THRESHOLD_PIXELS,
//       );

//       props.scrollAt?.({
//         bottom: isAtBottom,
//         left: isAtLeft,
//         right: isAtRight,
//         top: isAtTop,
//       });
//     },
//     [isAtBottom, isAtLeft, isAtRight, isAtTop, props.scrollAt],
//   );

//   return (
//     <ScrollArea className={cn('relative', className)}>
//       {showShadowTop && (
//         <div
//           className={cn(
//             'pointer-events-none absolute top-0 z-10 h-12 w-full opacity-0 transition-opacity duration-300 ease-in-out will-change-[opacity]',
//             `${!isAtTop ? 'opacity-100' : ''}`,
//             `${shadowBorder && !isAtTop ? 'border-border border-t' : ''}`,
//           )}
//         ></div>
//       )}
//       {props.children}
//       {showShadowBottom && (
//         <div
//           className={cn(
//             'pointer-events-none absolute bottom-0 z-10 h-12 w-full opacity-0 transition-opacity duration-300 ease-in-out will-change-[opacity]',
//             `${!isAtTop && !isAtBottom ? 'opacity-100' : ''}`,
//             `${shadowBorder && !isAtTop && !isAtBottom ? 'border-border border-b' : ''}`,
//           )}
//         ></div>
//       )}
//       {horizontal && (
//         <ScrollBar
//           className={cn(props.scrollBarClass)}
//           orientation="horizontal"
//         />
//       )}
//     </ScrollArea>
//   );
// };

export const ScScrollbar = {};
