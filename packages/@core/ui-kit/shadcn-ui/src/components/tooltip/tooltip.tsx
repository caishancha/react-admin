import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui';

import { cn } from '@react-admin-core/shared/utils';
import type { ClassType } from '@react-admin-core/typings';
import type { TooltipContentProps } from '@radix-ui/react-tooltip';

import type { CSSProperties } from 'react';

interface Props {
  contentClass?: ClassType;
  contentStyle?: CSSProperties;
  delayDuration?: number;
  side?: TooltipContentProps['side'];
  triggerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const ScTooltip = ({
  delayDuration = 0,
  side = 'right',
  ...props
}: Props) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{props.triggerContent}</TooltipTrigger>
        <TooltipContent
          className={cn(
            'side-content text-popover-foreground bg-accent rounded-md',
            props.contentClass,
          )}
          style={props.contentStyle}
          side={side}
        >
          {props.children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
