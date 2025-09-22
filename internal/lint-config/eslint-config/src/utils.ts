export type Awaitable<T> = Promise<T> | T;

/**
 * @description 处理模块默认导出兼容性的工具函数
 * @param m 表示一个 Promise 或直接的值（任何可以通过 await 解析的值）
 * @returns 如果 T 包含 default 属性，则返回 default 属性的类型 U，否则返回 T 本身的类型
 */
export async function interopDefault<T>(
  m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}
