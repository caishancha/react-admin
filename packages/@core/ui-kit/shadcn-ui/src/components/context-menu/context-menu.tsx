import type {
  ContextMenuProps,
  ContextMenuContentProps,
} from '@radix-ui/react-context-menu';
import type { ClassType } from '@react-admin-core/typings';
import type { IContextMenuItem } from './interface';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../../ui';
import { SCIcon } from '../icon';
import { cn } from '@react-admin-core/shared/utils';
import { useMemo } from 'react';

export const SCContextMenu = ({
  className,
  contentClass,
  contentProps,
  itemClass,
  subClass,
  ...props
}: ContextMenuProps & {
  className?: ClassType;
  contentClass?: ClassType;
  contentProps?: ContextMenuContentProps;
  handlerData?: Record<string, any>;
  itemClass?: ClassType;
  subClass?: ClassType;
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

  const renderChildrenItem = (menuList: IContextMenuItem[]) => {
    return menuList.map(menu => (
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>{menu.text}</ContextMenuSubTrigger>
        <ContextMenuSubContent className={cn('w-44', subClass)}>
          <ContextMenuItem
            className={cn('', itemClass)}
            disabled={menu.disabled}
            inset={menu.inset || !menu.icon}
            onClick={() => handleClick(menu)}
          >
            {menu.icon && (
              <SCIcon icon={menu.icon} className="mr-2 size-4 text-lg" />
            )}
            {menu.text}
            {menu.shortcut && (
              <ContextMenuShortcut>{menu.shortcut}</ContextMenuShortcut>
            )}
          </ContextMenuItem>
          {menu.subMenus?.length && renderChildrenItem(menu.subMenus)}
          {menu.separator && <ContextMenuSeparator />}
          {menu.type === 'checkbox' && (
            <ContextMenuCheckboxItem
              className={cn('', itemClass)}
              disabled={menu.disabled}
              checked={menu.checked || false}
              onClick={() => handleClick(menu)}
            >
              {menu.text}
              {menu.shortcut && (
                <ContextMenuShortcut>{menu.shortcut}</ContextMenuShortcut>
              )}
            </ContextMenuCheckboxItem>
          )}
        </ContextMenuSubContent>
      </ContextMenuSub>
    ));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn('', className)}>
        {props.children ?? 'Right click here'}
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
                <SCIcon icon={menu.icon} className="mr-2 size-4 text-lg" />
              )}
              {menu.text}
              {menu.shortcut && (
                <ContextMenuShortcut>{menu.shortcut}</ContextMenuShortcut>
              )}
            </ContextMenuItem>
            {menu.subMenus?.length && renderChildrenItem(menu.subMenus)}
            {menu.separator && <ContextMenuSeparator />}
            {menu.type === 'checkbox' && (
              <ContextMenuCheckboxItem
                className={cn('', itemClass)}
                disabled={menu.disabled}
                checked={menu.checked || false}
                onClick={() => handleClick(menu)}
              >
                {menu.text}
                {menu.shortcut && (
                  <ContextMenuShortcut>{menu.shortcut}</ContextMenuShortcut>
                )}
              </ContextMenuCheckboxItem>
            )}
          </div>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};
