import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../ui';

import { ChevronDown } from '@react-admin-core/icons';

// import { TransitionGroup } from 'react-transition-group';
import type { BreadcrumbProps } from './types';
import { SCIcon } from '../icon';

interface Props extends BreadcrumbProps {}

export const SCBreadcrumb = ({
  showIcon = false,
  onSelect,
  ...props
}: Props) => {
  function handleClick(path?: string) {
    if (!path) return;
    onSelect?.(path);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.breadcrumbs.map((item, index) => (
          <div
            key={`${item.path}-${item.title}-${index}`}
            className="flex-center"
          >
            <BreadcrumbItem>
              {item.items?.length ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                    {showIcon && <SCIcon icon={item.icon} className="size-4" />}
                    {item.title}
                    <ChevronDown className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.items?.map(menuItem => (
                      <DropdownMenuItem
                        key={`sub-${menuItem.path}`}
                        onClick={() => handleClick(menuItem.path)}
                      >
                        {showIcon && (
                          <SCIcon
                            icon={menuItem.icon}
                            className="size-4 mr-1"
                          />
                        )}
                        {menuItem.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : index !== props.breadcrumbs.length - 1 ? (
                <BreadcrumbLink asChild>
                  <div
                    className="flex-center cursor-pointer"
                    onClick={() => handleClick(item.path)}
                  >
                    {showIcon && (
                      <SCIcon icon={item.icon} className="size-4 mr-1" />
                    )}
                    {item.title}
                  </div>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  <div className="flex-center">
                    {showIcon && (
                      <SCIcon icon={item.icon} className="mr-1 size-4" />
                    )}
                    {item.title}
                  </div>
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < props.breadcrumbs.length - 1 && !item.isHome && (
              <BreadcrumbSeparator />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
