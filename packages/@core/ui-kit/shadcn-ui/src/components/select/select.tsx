import { cn } from '@react-admin-core/shared/utils';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '../../ui';
import { useState } from 'react';

interface Props {
  className?: any;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const ScSelect = ({
  value,
  className,
  placeholder,
  options = [],
  ...props
}: Props) => {
  const [selectValue, setSelectValue] = useState(value);

  return (
    <Select
      value={selectValue}
      onValueChange={e => {
        setSelectValue(e);
        props.onChange?.(e);
      }}
    >
      <SelectTrigger className={cn('flex w-full items-center', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(item => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
