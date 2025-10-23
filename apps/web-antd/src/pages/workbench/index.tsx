import { SCAvatar, SCButton, SCBackTop } from '@react-admin-core/shadcn-ui';

export const Workbench = () => {
  return (
    <div className="w-full h-[1200px]">
      <div className="size-20">
        <SCAvatar size={80} src="https://picsum.photos/200/300" dot />
      </div>
      <SCButton>我是按钮</SCButton>
      <SCBackTop />
    </div>
  );
};
