import type { ComponentType } from 'react';

import type { BreadcrumbStyleType } from '@react-admin-core/typings';

export interface IBreadcrumb {
  icon?: ComponentType | string;
  isHome?: boolean;
  items?: IBreadcrumb[];
  path?: string;
  title?: string;
}

export interface BreadcrumbProps {
  breadcrumbs: IBreadcrumb[];
  showIcon?: boolean;
  styleType?: BreadcrumbStyleType;
  onSelect?: (path?: string) => void;
}
