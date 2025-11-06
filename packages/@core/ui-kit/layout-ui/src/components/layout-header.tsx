import { useMemo, type CSSProperties } from 'react';

interface Props {
  /**
   * 横屏
   */
  fullWidth: boolean;
  /**
   * 高度
   */
  height: number;
  /**
   * 是否移动端
   */
  isMobile: boolean;
  /**
   * 是否显示
   */
  show: boolean;
  /**
   * 侧边菜单宽度
   */
  sidebarWidth: number;
  /**
   * 主题
   */
  theme: string | undefined;
  /**
   * 宽度
   */
  width: string;
  /**
   * zIndex
   */
  zIndex: number;
  /**
   * Logo
   */
  logoContent: React.ReactNode;
  /**
   * 切换按钮
   */
  toggleButtonContent: React.ReactNode;
  /**
   * 子元素
   */
  children: React.ReactNode;
}

export const LayoutHeader = (props: Props) => {
  const { fullWidth, height, show } = props;

  const style = useMemo((): CSSProperties => {
    const right = !show || !fullWidth ? undefined : 0;
    return {
      height: `${height}px`,
      marginTop: show ? 0 : `-${height}px`,
      right,
    };
  }, [fullWidth, height, show]);

  const logoStyle = useMemo((): CSSProperties => {
    return {
      minWidth: `${props.isMobile ? 40 : props.sidebarWidth}px`,
    };
  }, [height]);

  return (
    <header
      style={style}
      className="border-border bg-header top-0 flex w-full flex-[0_0_auto] items-center border-b pl-2 transition-[margin-top] duration-200"
    >
      {props.logoContent && <div style={logoStyle}>{props.logoContent}</div>}
      {props.toggleButtonContent}
      {props.children}
    </header>
  );
};
