import {
  ScAvatar,
  ScButton,
  ScBackTop,
  ScBreadcrumb,
  ScCheckbox,
  ScContextMenu,
  ScDropdownMenu,
  ScFullScreen,
  ScHoverCard,
} from '@react-admin-core/shadcn-ui';

export const Workbench = () => {
  const breadcrumbs = [
    {
      icon: 'mdi:home-outline',
      isHome: true,
      path: '/',
      title: '首页',
    },
    {
      icon: 'lucide:layout-dashboard',
      path: '/dashboard',
      title: '概览',
    },
    {
      icon: 'lucide:area-chart',
      path: '/analytics',
      title: '分析页',
    },
    {
      icon: 'lucide:folder',
      path: '/folder',
      title: '文件夹',
      items: [
        {
          path: '/folder/file',
          title: '文件',
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="size-20">
        <ScAvatar size={80} src="https://picsum.photos/200/300" dot />
      </div>
      <ScButton>我是按钮</ScButton>
      <ScBackTop />
      <ScBreadcrumb breadcrumbs={breadcrumbs} showIcon />
      <ScCheckbox>我是复选框</ScCheckbox>
      <div className="mt-2"></div>
      <ScContextMenu menus={() => []}>
        {/* <ScButton>我是按钮</ScButton> */}
      </ScContextMenu>
      <ScDropdownMenu menus={[]}></ScDropdownMenu>
      <ScFullScreen />
      <ScHoverCard
        openDelay={100}
        trigger={<ScButton>我是按钮</ScButton>}
        content={<div>我是内容</div>}
      />
    </div>
  );
};
