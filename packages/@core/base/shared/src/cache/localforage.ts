import localforage from 'localforage';
import type { StorageItem, StorageManagerOptions } from './types';

class ProxyStorage {
  private prefix: string;
  private storage: LocalForage;
  constructor({
    name = '',
    prefix = '',
  }: Omit<StorageManagerOptions, 'storageType'> = {}) {
    this.prefix = prefix;
    this.storage = localforage;
    this.storage.config({
      // 首选IndexedDB作为第一驱动，不支持IndexedDB会自动降级到localStorage（WebSQL被弃用，详情看https://developer.chrome.com/blog/deprecating-web-sql）
      driver: [this.storage.INDEXEDDB, this.storage.LOCALSTORAGE],
      name,
    });
  }

  /**
   * @description 将对应键名的数据保存到离线仓库
   * @param k 键名
   * @param v 键值
   * @param m 缓存时间（单位`分`，默认`0`分钟，永久缓存）
   */
  public async setItem<T>(k: string, v: T, m = 0): Promise<T> {
    const fullKey = this.getFullKey(k);
    return new Promise((resolve, reject) => {
      this.storage
        .setItem<StorageItem<T>>(fullKey, {
          value: v,
          expiry: m ? new Date().getTime() + m * 60 * 1000 : 0,
        })
        .then(value => {
          resolve(value.value);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description 从离线仓库中获取对应键名的值
   * @param k 键名
   */
  public async getItem<T>(k: string): Promise<T | void> {
    const fullKey = this.getFullKey(k);
    return new Promise((resolve, reject) => {
      this.storage
        .getItem<StorageItem<T>>(fullKey)
        .then(value => {
          value && (value.expiry! > new Date().getTime() || value.expiry === 0)
            ? resolve(value.value)
            : resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description 从离线仓库中删除对应键名的值
   * @param k 键名
   */
  public async removeItem(k: string) {
    const fullKey = this.getFullKey(k);
    return new Promise<void>((resolve, reject) => {
      this.storage
        .removeItem(fullKey)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description 从离线仓库中删除所有的键名，重置数据库
   */
  public async clear() {
    return new Promise<void>((resolve, reject) => {
      this.storage
        .clear()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description 获取数据仓库中所有的key
   */
  public async keys() {
    return new Promise<string[]>((resolve, reject) => {
      this.storage
        .keys()
        .then(keys => {
          resolve(keys);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * 获取完整的存储键
   * @param key 原始键
   * @returns 带前缀的完整键
   */
  private getFullKey(key: string): string {
    return `${this.prefix}-${key}`;
  }
}

/**
 * 二次封装 [localforage](https://localforage.docschina.org/) 支持设置过期时间，提供完整的类型提示
 */
export { ProxyStorage };
