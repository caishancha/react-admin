import { useMemo, type CSSProperties } from 'react';

interface Props {
  /**
   * 是否固定在底部
   */
  fixed?: boolean;
  height: number;
  /**
   * 是否显示
   * @default true
   */
  show?: boolean;
  width: string;
  zIndex: number;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export const LayoutFooter = (props: Props) => {
  const { fixed, height, show = true, width, zIndex } = props;
  const style = useMemo<CSSProperties>(
    () => ({
      height: `${height}px`,
      marginBottom: show ? '0' : `-${height}px`,
      position: fixed ? 'fixed' : 'static',
      width,
      zIndex,
    }),
    [fixed, height, show, width, zIndex],
  );

  return (
    <footer
      style={style}
      className="bg-background-deep bottom-0 w-full transition-all duration-200"
    >
      {props.children}
    </footer>
  );
};
