import { useMemo } from 'react';
import { cn } from '@react-admin-core/shared/utils';

import { Button, buttonVariants, Spinner } from '../../ui';
import type { SCButtonProps } from './button';

interface Props extends SCButtonProps {}

export function SCButton({
  className,
  disabled,
  loading,
  size,
  variant,
  children,
  ...props
}: React.ComponentProps<'button'> & Props) {
  const isDisabled = useMemo(() => {
    return disabled || loading;
  }, [disabled, loading]);

  return (
    <Button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      children={
        <>
          {loading && <Spinner />}
          {children}
        </>
      }
      {...props}
    />
  );
}
