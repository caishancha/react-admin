import { cn } from '@react-admin-core/shared/utils';
import styles from './spinner.module.css';
import { useEffect, useRef, useState } from 'react';

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
}

export const ScSpinner = ({ minLoadingTime = 50, ...props }: Props) => {
  const [renderSpinner, setRenderSpinner] = useState<boolean>(false);
  const showSpinner = useRef(false);
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
        'flex-center z-100 bg-overlay-content absolute left-0 top-0 size-full backdrop-blur-sm transition-all duration-500',
        {
          'invisible opacity-0': !showSpinner.current,
        },
        props.className,
      )}
      onTransitionEnd={onTransitionEnd}
    >
      {renderSpinner && (
        <div
          className={cn(
            styles.loader,
            `${!renderSpinner ? styles.paused : ''}`,
            "before:bg-primary/50 after:bg-primary relative size-12 before:absolute before:left-0 before:top-[60px] before:h-[5px] before:w-12 before:rounded-[50%] before:content-[''] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded after:content-['']",
          )}
        ></div>
      )}
    </div>
  );
};
