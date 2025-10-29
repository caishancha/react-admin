import { useMemo } from 'react';

import { Button, Spinner } from '../../ui';
import type { SCButtonProps } from './button';

interface Props extends SCButtonProps {}

export function ScButton({
  disabled,
  loading,
  children,
  ...props
}: React.ComponentProps<'button'> & Props) {
  const isDisabled = useMemo(() => {
    return disabled || loading;
  }, [disabled, loading]);

  return (
    <Button
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
