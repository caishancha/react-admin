import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui';

import type { DropdownMenuProps as DropdownMenuPropsBase } from '@radix-ui/react-dropdown-menu';

import type { IDropdownMenuItem, IDropdownMenuProps } from './interface';
import { ScIcon } from '../icon';

interface Props extends IDropdownMenuProps {}

export function ScDropdownMenu({
  menus,
  ...props
}: DropdownMenuPropsBase & Props) {
  function handleItemClick(menu: IDropdownMenuItem) {
    if (menu.disabled) {
      return;
    }
    menu?.handler?.(props);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {menus.map((item, index) => (
          <div key={index}>
            {item.label && <DropdownMenuLabel>{item.label}</DropdownMenuLabel>}
            <DropdownMenuGroup>
              {item.data.map(menu => (
                <DropdownMenuItem
                  key={menu.value}
                  className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground text-foreground/80 mb-1 cursor-pointer"
                  onClick={() => handleItemClick(menu)}
                >
                  {menu.icon && <ScIcon icon={menu.icon} />}
                  {menu.name}
                  {menu.shortcut && (
                    <DropdownMenuShortcut>{menu.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {item.separator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
