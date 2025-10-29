import type {
  HoverCardContentProps,
  HoverCardProps,
} from '@radix-ui/react-hover-card';

import type { ClassType } from '@react-admin-core/typings';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../ui';
import { cn } from '@react-admin-core/shared/utils';

interface Props extends HoverCardProps {
  className?: ClassType;
  contentClass?: ClassType;
  trigger?: React.ReactNode;
  content: React.ReactNode;
  contentProps?: HoverCardContentProps;
}

export const ScHoverCard = ({
  className,
  contentClass,
  trigger,
  contentProps,
  content,
  ...props
}: Props) => {
  return (
    <HoverCard {...props}>
      <HoverCardTrigger asChild>
        <div className={cn('h-full cursor-pointer', className)}>
          {trigger ?? props.children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        {...contentProps}
        align="start"
        className={cn('side-content z-popup', contentClass)}
      >
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};
