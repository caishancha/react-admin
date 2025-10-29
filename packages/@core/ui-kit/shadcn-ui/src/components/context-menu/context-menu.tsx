import type {
  ContextMenuProps,
  ContextMenuContentProps,
} from '@radix-ui/react-context-menu';
import type { ClassType } from '@react-admin-core/typings';
import type { IContextMenuItem } from './interface';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '../../ui';

import { ScIcon } from '../icon';
import { cn } from '@react-admin-core/shared/utils';
import { useMemo } from 'react';

export const ScContextMenu = ({
  className,
  contentClass,
  contentProps,
  itemClass,
  ...props
}: ContextMenuProps & {
  className?: ClassType;
  contentClass?: ClassType;
  contentProps?: ContextMenuContentProps;
  handlerData?: Record<string, any>;
  itemClass?: ClassType;
  menus: (data: any) => IContextMenuItem[];
}) => {
  const menusView = useMemo(() => {
    return props.menus?.(props.handlerData);
  }, [props.handlerData, props.menus]);

  function handleClick(menu: IContextMenuItem) {
    if (menu.disabled) {
      return;
    }
    menu?.handler?.(props.handlerData);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn('', className)}>
        {props.children}
      </ContextMenuTrigger>
      <ContextMenuContent
        {...contentProps}
        className={cn('side-content z-popup', contentClass)}
      >
        {menusView?.map(menu => (
          <div key={menu.key}>
            <ContextMenuItem
              className={cn('', itemClass)}
              disabled={menu.disabled}
              inset={menu.inset || !menu.icon}
              onClick={() => handleClick(menu)}
            >
              {menu.icon && (
                <ScIcon icon={menu.icon} className="mr-2 size-4 text-lg" />
              )}
              {menu.text}
              {menu.shortcut && (
                <ContextMenuShortcut>{menu.shortcut}</ContextMenuShortcut>
              )}
            </ContextMenuItem>
            {menu.separator && <ContextMenuSeparator />}
          </div>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};
