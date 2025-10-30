import { cn } from '@react-admin-core/shared/utils';
import { ScAvatar } from '../avatar';

interface Props {
  /**
   * @zh_CN 是否收起文本
   */
  collapsed?: boolean;
  /**
   * @zh_CN Logo 图片适应方式
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * @zh_CN Logo 跳转地址
   */
  href?: string;
  /**
   * @zh_CN Logo 图片大小
   */
  logoSize?: number;
  /**
   * @zh_CN Logo 图标
   */
  src?: string;
  /**
   * @zh_CN Logo 文本
   */
  text: string;
  /**
   * @zh_CN Logo 主题
   */
  theme?: string;
}

export const ScLogo = ({
  collapsed = false,
  fit = 'cover',
  href = 'javascript:void 0;',
  logoSize = 32,
  src = '',
  theme = 'light',
  text,
}: Props) => {
  return (
    <div className={cn('flex h-full items-center text-lg', theme)}>
      <a
        href={href}
        className={cn(
          'flex h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-500',
        )}
      >
        {src && (
          <ScAvatar
            alt={text}
            src={src}
            size={logoSize}
            fit={fit}
            className="relative rounded-none bg-transparent"
          />
        )}
        {!collapsed && (
          <span className="text-foreground truncate text-nowrap font-semibold">
            {text}
          </span>
        )}
      </a>
    </div>
  );
};
