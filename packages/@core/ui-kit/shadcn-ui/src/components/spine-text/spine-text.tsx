import { cn } from '@react-admin-core/shared/utils';
import styles from './spine-text.module.css';

interface Props {
  // 动画持续时间，单位秒
  animationDuration?: number;
  // 动画是否只执行一次
  animationIterationCount?: 'infinite' | number;
  // 子元素
  children?: React.ReactNode;
}

export const ScSpineText = ({
  animationDuration = 2,
  animationIterationCount = 'infinite',
  ...props
}: Props) => {
  return (
    <div
      style={{
        animation: `${styles.shine} ${animationDuration}s linear ${animationIterationCount}`,
      }}
      className={cn('!bg-clip-text text-transparent', styles['sc-spine-text'])}
    >
      {props.children}
    </div>
  );
};
