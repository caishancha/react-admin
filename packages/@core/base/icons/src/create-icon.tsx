import { Icon, type IconProps } from '@iconify/react';

function createIconifyIcon(icon: string) {
  return (props: Omit<IconProps, 'icon'>) => <Icon icon={icon} {...props} />;
}

export { createIconifyIcon };
