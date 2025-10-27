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

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import type { BreadcrumbProps, IBreadcrumb } from './types';
import { SCIcon } from '../icon';
import { createRef, useMemo, type RefObject } from 'react';

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

  const breadcrumbs = useMemo<
    (IBreadcrumb & { nodeRef: RefObject<HTMLDivElement | null> })[]
  >(() => {
    return props.breadcrumbs.map(item => ({
      ...item,
      nodeRef: createRef<HTMLDivElement | null>(),
    }));
  }, [props.breadcrumbs]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <TransitionGroup className="flex items-center gap-1.5">
          {breadcrumbs.map((item, index) => (
            <CSSTransition
              nodeRef={item.nodeRef}
              key={`${item.path}-${item.title}-${index}`}
              timeout={300}
              classNames="breadcrumb-transition"
            >
              <div ref={item.nodeRef} className="flex-center">
                <BreadcrumbItem>
                  {item.items?.length ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                        {showIcon && (
                          <SCIcon icon={item.icon} className="size-4" />
                        )}
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
            </CSSTransition>
          ))}
        </TransitionGroup>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
