// import { useRef, type CSSProperties } from 'react';
// import { useDefineModel } from '@react-admin-core/composables';
// import { ScScrollbar } from '@react-admin-core/shadcn-ui';
// import { useScrollLock } from '@reactuses/core';
// import { SidebarCollapseButton, SidebarFixedButton } from './widgets';

// interface DefineModelProps {
//   collapse?: boolean;
//   onUpdateCollapse?: (newValue: boolean) => void;
//   extraCollapse?: boolean;
//   onUpdateExtraCollapse?: (newValue: boolean) => void;
//   expandOnHovering?: boolean;
//   onUpdateExpandOnHovering?: (newValue: boolean) => void;
//   expandOnHover?: boolean;
//   onUpdateExpandOnHover?: (newValue: boolean) => void;
//   extraVisible?: boolean;
//   onUpdateExtraVisible?: (newValue: boolean) => void;
// }

// interface Props extends DefineModelProps {
//   /**
//    * 折叠区域高度
//    * @default 42
//    */
//   collapseHeight?: number;
//   /**
//    * 折叠宽度
//    * @default 48
//    */
//   collapseWidth?: number;
//   /**
//    * 隐藏的dom是否可见
//    * @default true
//    */
//   domVisible?: boolean;
//   /**
//    * 扩展区域宽度
//    */
//   extraWidth: number;
//   /**
//    * 固定扩展区域
//    * @default false
//    */
//   fixedExtra?: boolean;
//   /**
//    * 头部高度
//    */
//   headerHeight: number;
//   /**
//    * 是否侧边混合模式
//    * @default false
//    */
//   isSidebarMixed?: boolean;
//   /**
//    * 顶部margin
//    * @default 60
//    */
//   marginTop?: number;
//   /**
//    * 混合菜单宽度
//    * @default 80
//    */
//   mixedWidth?: number;
//   /**
//    * 顶部padding
//    * @default 60
//    */
//   paddingTop?: number;
//   /**
//    * 是否显示
//    * @default true
//    */
//   show?: boolean;
//   /**
//    * 显示折叠按钮
//    * @default true
//    */
//   showCollapseButton?: boolean;
//   /**
//    * 显示固定按钮
//    * @default true
//    */
//   showFixedButton?: boolean;
//   /**
//    * 主题
//    */
//   theme: string;

//   /**
//    * 宽度
//    */
//   width: number;
//   /**
//    * zIndex
//    * @default 0
//    */
//   zIndex?: number;
//   /**
//    * 离开侧边栏回调
//    */
//   onLeave?: () => void;
// }

// export const LayoutSidebar = ({
//   collapseHeight = 42,
//   collapseWidth = 48,
//   domVisible = true,
//   fixedExtra = false,
//   isSidebarMixed = false,
//   marginTop = 0,
//   mixedWidth = 70,
//   paddingTop = 0,
//   show = true,
//   showCollapseButton = true,
//   showFixedButton = true,
//   zIndex = 0,
//   ...props
// }: Props) => {
//   const { ...defineModelProps }: Pick<Props, keyof DefineModelProps> = props;
//   const [collapse, setCollapse] = useDefineModel(defineModelProps, 'collapse');
//   const [extraCollapse, setExtraCollapse] = useDefineModel(
//     defineModelProps,
//     'extraCollapse',
//   );
//   const [expandOnHovering, setExpandOnHovering] = useDefineModel(
//     defineModelProps,
//     'expandOnHovering',
//   );
//   const [expandOnHover, setExpandOnHover] = useDefineModel(
//     defineModelProps,
//     'expandOnHover',
//   );
//   const [extraVisible, setExtraVisible] = useDefineModel(
//     defineModelProps,
//     'extraVisible',
//   );

//   const [locked, setLocked] = useScrollLock(document.body);

//   const asideRef = useRef<HTMLDivElement>(null);

//   return <>{}</>;
// };
