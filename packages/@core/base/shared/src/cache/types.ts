type StorageType = 'localStorage' | 'sessionStorage';

interface StorageValue<T> {
  data: T;
  expiry: null | number;
}

export type { StorageType, StorageValue };
