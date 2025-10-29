import type { ComponentType } from 'react';

interface IDropdownMenuItem {
  disabled?: boolean;
  /**
   * @zh_CN 点击事件处理
   * @param data
   */
  handler?: (data: any) => void;
  /**
   * @zh_CN 快捷键
   */
  shortcut?: string;
  /**
   * @zh_CN 图标
   */
  icon?: ComponentType;
  /**
   * @zh_CN 标题
   */
  name: string;
  /**
   * @zh_CN 唯一标识
   */
  value: string;
}

interface IMenusProps {
  /**
   * @zh_CN 标题
   */
  label?: string;
  /**
   * @zh_CN 是否是分割线
   */
  separator?: boolean;
  /**
   * @zh_CN 菜单列表
   */
  data: IDropdownMenuItem[];
}

interface IDropdownMenuProps {
  menus: IMenusProps[];
}

export type { IDropdownMenuProps, IDropdownMenuItem };
