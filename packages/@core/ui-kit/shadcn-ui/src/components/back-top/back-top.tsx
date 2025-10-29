import { useMemo, useRef } from 'react';
import type { BacktopProps } from './backtop';
import { CSSTransition } from 'react-transition-group';

import { ArrowUpToLine } from '@react-admin-core/icons';

import { useBackTop } from './use-backtop';
import { ScButton } from '../button';

interface Props extends BacktopProps {}

export const ScBackTop = ({
  bottom = 20,
  right = 24,
  target = '',
  visibilityHeight = 200,
  ...props
}: Props) => {
  const nodeRef = useRef<HTMLButtonElement>(null);

  const backTopStyle = useMemo(
    () => ({
      bottom: `${bottom}px`,
      right: `${right}px`,
    }),
    [bottom, right],
  );

  const { handleClick, visible } = useBackTop({
    target,
    visibilityHeight,
    ...props,
  });

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={300}
      classNames="fade-down"
      unmountOnExit
    >
      <ScButton
        ref={nodeRef}
        style={backTopStyle}
        className="dark:bg-accent dark:hover:bg-heavy bg-background hover:bg-heavy shadow-float z-popup fixed bottom-10 size-10 rounded-full duration-500"
        variant="outline"
        size="icon"
        onClick={handleClick}
      >
        <ArrowUpToLine className="size-4" />
      </ScButton>
    </CSSTransition>
  );
};
