import localforage from 'localforage';
import type { StorageValue } from './types';

interface ProxyStorageOptions {
  namespace?: string;
}

class ProxyStorage {
  protected storage: LocalForage;
  constructor({ namespace = '' }: ProxyStorageOptions = {}) {
    this.storage = localforage;
    this.storage.config({
      // 首选IndexedDB作为第一驱动，不支持IndexedDB会自动降级到localStorage（WebSQL被弃用，详情看https://developer.chrome.com/blog/deprecating-web-sql）
      driver: [this.storage.INDEXEDDB, this.storage.LOCALSTORAGE],
      name: namespace,
    });
  }

  /**
   * @description 将对应键名的数据保存到离线仓库
   * @param k 键名
   * @param v 键值
   * @param m 缓存时间（单位`分`，默认`0`分钟，永久缓存）
   */
  public async setItem<T>(k: string, v: T, m = 0): Promise<T> {
    return new Promise((resolve, reject) => {
      this.storage
        .setItem(k, {
          data: v,
          expires: m ? new Date().getTime() + m * 60 * 1000 : 0,
        })
        .then(value => {
          resolve(value.data);
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
    return new Promise((resolve, reject) => {
      this.storage
        .getItem<StorageValue<T>>(k)
        .then(value => {
          value && (value.expiry! > new Date().getTime() || value.expiry === 0)
            ? resolve(value.data)
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
    return new Promise<void>((resolve, reject) => {
      this.storage
        .removeItem(k)
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
}

/**
 * 二次封装 [localforage](https://localforage.docschina.org/) 支持设置过期时间，提供完整的类型提示
 */
export { ProxyStorage };
