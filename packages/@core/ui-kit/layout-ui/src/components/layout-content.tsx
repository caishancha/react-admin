import { useMemo, type CSSProperties } from 'react';
import type { ContentCompactType } from '@react-admin-core/typings';
import { useLayoutContentStyle } from '@react-admin-core/composables';
import { Slot } from '@react-admin-core/shadcn-ui';

interface Props {
  /**
   * 内容区域定宽
   */
  contentCompact: ContentCompactType;
  /**
   * 定宽布局宽度
   */
  contentCompactWidth: number;
  padding: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;

  overlayContent: React.ReactNode;
  children: React.ReactNode;
}

export const LayoutContent = (props: Props) => {
  const { contentElement, overlayStyle } = useLayoutContentStyle();

  const {
    contentCompact,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = props;

  const style = useMemo<CSSProperties>(() => {
    const compactStyle: CSSProperties =
      contentCompact === 'compact'
        ? { margin: '0 auto', width: `${props.contentCompactWidth}px` }
        : {};
    return {
      ...compactStyle,
      flex: 1,
      padding: `${padding}px`,
      paddingBottom: `${paddingBottom}px`,
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`,
      paddingTop: `${paddingTop}px`,
    };
  }, [padding, paddingBottom, paddingLeft, paddingRight, paddingTop]);

  return (
    <main
      ref={contentElement}
      style={style}
      className="bg-background-deep relative"
    >
      <Slot style={overlayStyle}>{props.overlayContent}</Slot>
      {props.children}
    </main>
  );
};
