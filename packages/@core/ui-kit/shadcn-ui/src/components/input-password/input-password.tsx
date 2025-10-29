import { useState } from 'react';
import { Input } from '../../ui';
import { cn } from '@react-admin-core/shared/utils';
import { Eye, EyeOff } from '@react-admin-core/icons';
import { ScPasswordStrength } from './password-strength';

interface Props {
  value?: string;
  className?: any;
  /**
   * 是否显示密码强度
   */
  passwordStrength?: boolean;
  /**
   * 密码强度提示文本
   */
  strengthText?: React.ReactNode | string;
  onChange?: (value: string) => void;
}

export const ScInputPassword = ({
  className,
  passwordStrength,
  ...props
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        value={props.value}
        className={cn(className)}
        type={show ? 'text' : 'password'}
        onChange={e => props.onChange?.(e.target.value)}
      />
      {passwordStrength && (
        <>
          <ScPasswordStrength password={props.value} />
          {props.strengthText && (
            <p className="text-muted-foreground mt-1.5 text-xs">
              {props.strengthText}
            </p>
          )}
        </>
      )}
      <div
        className={`
          hover:text-foreground text-foreground/60 absolute inset-y-0 right-0 flex cursor-pointer pr-3 text-lg leading-5
          ${passwordStrength ? 'top-3' : ''} ${!passwordStrength ? 'top-1/2 -translate-y-1/2 items-center' : ''}`}
        onClick={() => setShow(!show)}
      >
        {show ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      </div>
    </div>
  );
};
