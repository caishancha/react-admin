import {
  SCAvatar,
  SCButton,
  SCBackTop,
  SCBreadcrumb,
  SCCheckbox,
  SCContextMenu,
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
        <SCAvatar size={80} src="https://picsum.photos/200/300" dot />
      </div>
      <SCButton>我是按钮</SCButton>
      <SCBackTop />
      <SCBreadcrumb breadcrumbs={breadcrumbs} showIcon />
      <SCCheckbox>我是复选框</SCCheckbox>
      <div className="mt-2"></div>
      <SCContextMenu menus={() => []} />
    </div>
  );
};
