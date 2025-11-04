import { useEffect, useRef, useState } from 'react';

import { cn } from '@react-admin-core/shared/utils';

import styles from './loading.module.css';

interface Props {
  className?: string;
  /**
   * @zh_CN 最小加载时间
   * @en_US Minimum loading time
   */
  minLoadingTime?: number;

  /**
   * @zh_CN loading状态开启
   */
  spinning?: boolean;
  /**
   * @zh_CN 文字
   */
  text?: string;
  /**
   * @zh_CN 加载图标
   */
  icon?: React.ReactNode;
  /**
   * @zh_CN 子元素
   */
  children?: React.ReactNode;
}

export const ScLoading = ({
  minLoadingTime = 50,
  text = '',
  ...props
}: Props) => {
  const [renderSpinner, setRenderSpinner] = useState<boolean>(false);
  const showSpinner = useRef<boolean>(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(0);

  useEffect(() => {
    if (!props.spinning) {
      showSpinner.current = false;
      clearTimeout(timer.current);
      return;
    }

    timer.current = setTimeout(() => {
      showSpinner.current = true;
      if (showSpinner.current) {
        setRenderSpinner(true);
      }
    }, minLoadingTime);
  }, [props.spinning]);
  function onTransitionEnd() {
    if (!showSpinner.current) {
      setRenderSpinner(false);
    }
  }

  return (
    <div
      className={cn(
        'z-100 dark:bg-overlay bg-overlay-content absolute left-0 top-0 flex size-full flex-col items-center justify-center transition-all duration-500',
        {
          'invisible opacity-0': !showSpinner.current,
        },
        props.className,
      )}
      onTransitionEnd={onTransitionEnd}
    >
      {renderSpinner &&
        (props.icon ?? (
          <span
            className={cn(styles.dot, 'relative inline-block size-9 text-3xl')}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <i
                key={index}
                className="bg-primary absolute block size-4 origin-[50%_50%] scale-75 rounded-full opacity-30"
              ></i>
            ))}
          </span>
        ))}
      {text && <div className="text-primary mt-4 text-xs">{text}</div>}
      {props.children}
    </div>
  );
};
