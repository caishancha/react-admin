import type { Locale } from './messages';

import { createStateContext } from 'react-use';

import { getMessages } from './messages';
import { useMemo } from 'react';

// 在提供程序中的所有组件之间共享。
const [useLocale, SimpleLocaleProvider] = createStateContext<Locale>('zh-CN');

export const useSimpleLocale = () => {
  const [currentLocale, setCurrentLocale] = useLocale();

  const setSimpleLocale = (locale: Locale) => {
    setCurrentLocale(locale);
  };

  const $t = useMemo(() => {
    const localeMessages = getMessages(currentLocale);
    return (key: string) => {
      return localeMessages[key] || key;
    };
  }, [currentLocale]);

  return {
    $t,
    currentLocale,
    setSimpleLocale,
    SimpleLocaleProvider,
  };
};
