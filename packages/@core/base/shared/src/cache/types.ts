type StorageType = 'localStorage' | 'sessionStorage';

interface StorageItem<T> {
  expiry?: number;
  value: T;
}
interface StorageManagerOptions {
  prefix?: string;
  name?: string;
  storageType?: StorageType;
}

export type { StorageItem, StorageManagerOptions };
