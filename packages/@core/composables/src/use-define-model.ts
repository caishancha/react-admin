import { useState, useEffect } from 'react';

type Props<T, TName extends string> = {
  // eslint-disable-next-line no-unused-vars
  [K in TName]?: T;
} & {
  // eslint-disable-next-line no-unused-vars
  [K in `onUpdate:${TName}`]?: (value: T) => void;
};

/**
 * 模拟 Vue 的 defineModel，实现双向绑定
 * @param  props - 组件接收的 props
 * @param  name - 绑定的名称（默认 'modelValue'，对应 Vue 的 v-model:name）
 */
const useDefineModel = <T, const TName extends string = 'modelValue'>(
  props: Props<T, TName>,
  name: TName = 'modelValue' as TName,
): [T, (newValue: T) => void] => {
  const valueKey = name;
  const updateKey = `onUpdate:${name}` as const;

  const propsValue = props[valueKey] as T | undefined;

  // 从 props 中提取值类型（T[TName]），初始化状态
  const [value, setValue] = useState<T>(propsValue ?? (null as T));

  // 父组件传递的绑定值变化时，同步子组件状态
  useEffect(() => {
    if (propsValue) setValue(propsValue);
  }, [propsValue]);

  // 修改值的函数：参数类型严格匹配 T[TName]
  const setModelValue = (newValue: T) => {
    setValue(newValue);
    const propsEvent = props[updateKey] as (value: T) => void;
    if (propsEvent) {
      propsEvent(newValue);
    }
  };

  return [value, setModelValue];
};

export { useDefineModel };
