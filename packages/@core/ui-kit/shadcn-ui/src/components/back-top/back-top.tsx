// import { useMemo } from 'react';
// import type { BacktopProps } from './backtop';
// import { CSSTransition } from 'react-transition-group';

// import { useBackTop } from './use-backtop';

// interface Props extends BacktopProps {}

// export const SCBackTop = (props: Props) => {
//   const {
//     bottom = 20,
//     right = 24,
//     target = '',
//     visibilityHeight = 200,
//   } = props || {};

//   const backTopStyle = useMemo(
//     () => ({
//       bottom: `${bottom}px`,
//       right: `${right}px`,
//     }),
//     [bottom, right],
//   );

//   const { handleClick, visible } = useBackTop({
//     target,
//     visibilityHeight,
//   });

//   return (
//     <CSSTransition
//       in={visible}
//       timeout={200}
//       classNames="fade-down"
//       unmountOnExit
//     ></CSSTransition>
//   );
// };
