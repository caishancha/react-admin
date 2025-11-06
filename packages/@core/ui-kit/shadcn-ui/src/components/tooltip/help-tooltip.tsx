import { cn } from '@react-admin-core/shared/utils';
import { ScTooltip } from './tooltip';
import { CircleHelp } from '@react-admin-core/icons';

interface Props {
  triggerClass?: string;
  triggerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const ScHelpTooltip = (props: Props) => {
  return (
    <ScTooltip
      triggerContent={
        props.triggerContent ?? (
          <CircleHelp
            className={cn(
              'text-foreground/80 hover:text-foreground inline-flex size-5 cursor-pointer',
              props.triggerClass,
            )}
          />
        )
      }
    >
      {props.children}
    </ScTooltip>
  );
};
