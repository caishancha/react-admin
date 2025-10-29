import { IconDefault, IconifyIcon } from '@react-admin-core/icons';
import { isHttpUrl, isObject, isString } from '@react-admin-core/shared/utils';
import React, { useMemo, type ComponentType } from 'react';

interface Props {
  icon?: ComponentType | string;
}

export const ScIcon = ({
  icon,
  ...props
}: Omit<
  React.ComponentProps<typeof IconDefault | typeof IconifyIcon | 'img'>,
  'icon'
> &
  Props) => {
  const isRemoteIcon = useMemo(() => {
    return isString(icon) && isHttpUrl(icon);
  }, [icon]);

  const isComponent = useMemo(() => {
    return !isString(icon) && isObject(icon);
  }, [icon]);

  const renderIcon = () => {
    if (isComponent) {
      return React.createElement(icon as ComponentType, props);
    }
    if (isRemoteIcon) {
      return (
        <img src={icon as string} {...(props as React.ComponentProps<'img'>)} />
      );
    }
    if (icon) {
      return (
        <IconifyIcon
          icon={icon as string}
          {...(props as Omit<React.ComponentProps<typeof IconifyIcon>, 'icon'>)}
        />
      );
    }
    return (
      <IconDefault {...(props as React.ComponentProps<typeof IconDefault>)} />
    );
  };

  return <>{renderIcon()}</>;
};
