import { useMemo } from 'react';
import { cn } from '@react-admin-core/shared/utils';
import { Button, buttonVariants, Spinner } from '../../ui';
import { SCButtonProps } from './button';

interface Props extends SCButtonProps {}

export function SCButton(props: Props) {
  const { className, disabled, loading, size, variant } = props;

  const isDisabled = useMemo(() => {
    return disabled || loading;
  }, [disabled, loading]);

  return (
    <Button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      disabled={isDisabled}
    >
      {loading && <Spinner />}
    </Button>
  );
}
