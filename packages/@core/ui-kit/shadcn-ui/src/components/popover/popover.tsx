import { cn } from '@react-admin-core/shared/utils';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui';
import type {
  PopoverContentProps,
  PopoverProps,
} from '@radix-ui/react-popover';
import type { ClassType } from '@react-admin-core/typings';

interface Props extends PopoverProps {
  contentClass?: ClassType;
  contentProps?: PopoverContentProps;
  triggerClass?: ClassType;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export const ScPopover = ({
  triggerClass,
  contentClass,
  contentProps,
  ...props
}: Props) => {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild className={cn(triggerClass)}>
        {props.trigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn('side-content z-popup', contentClass)}
        {...contentProps}
      >
        {props.content ?? props.children}
      </PopoverContent>
    </Popover>
  );
};
