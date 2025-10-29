import type { CheckboxProps } from '@radix-ui/react-checkbox';
import { useId } from 'react';

import { Checkbox, Label } from '../../ui';

export const ScCheckbox = (
  props: CheckboxProps & { indeterminate?: boolean },
) => {
  const id = useId();

  return (
    <div className="flex items-center">
      <Checkbox
        value={props.value}
        {...props}
        id={id}
        onCheckedChange={props.onCheckedChange}
      />
      <Label htmlFor={id} className="ml-2 cursor-pointer text-sm">
        {props.children}
      </Label>
    </div>
  );
};
