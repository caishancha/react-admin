import { useMemo, type CSSProperties } from 'react';

import type { ClassType } from '@react-admin-core/typings';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui';
import { cn } from '@react-admin-core/shared/utils';

interface Props {
  src: string;
  alt?: string;
  className?: ClassType;
  dot?: boolean;
  dotClass?: ClassType;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  size: number;
}

export const ScAvatar = (props: Props) => {
  const {
    alt = 'avatar',
    dot = false,
    dotClass = 'bg-green-500',
    fit = 'cover',
    size,
  } = props;

  const imageStyle = useMemo<CSSProperties>(() => {
    if (fit) {
      return { objectFit: fit };
    }
    return {};
  }, [fit]);

  const text = useMemo(() => {
    return alt.slice(-2).toUpperCase();
  }, [alt]);

  const rootStyle = useMemo(() => {
    return size !== undefined && size > 0
      ? {
          height: `${size}px`,
          width: `${size}px`,
        }
      : {};
  }, [size]);

  return (
    <div
      style={rootStyle}
      className={cn(
        'relative flex flex-shrink-0 items-center',
        props.className,
      )}
    >
      <Avatar className={cn('size-full', props.className)}>
        <AvatarImage alt={alt} src={props.src} style={imageStyle} />
        <AvatarFallback>{text}</AvatarFallback>
      </Avatar>
      {dot && (
        <span
          className={cn(
            'border-background absolute bottom-0 right-0 size-3 rounded-full border-2',
            dotClass,
          )}
        ></span>
      )}
    </div>
  );
};
