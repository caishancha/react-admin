import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProxyStorage, StorageManager } from '../index';

describe('CacheStorage', () => {
  let storageManager: StorageManager;
  let proxyStorage: ProxyStorage;

  beforeEach(() => {
    vi.useFakeTimers();
    storageManager = new StorageManager({
      prefix: 'test_',
    });
    proxyStorage = new ProxyStorage({
      name: 'test',
      prefix: 'test_',
    });
  });

  it('storageManager should set and get an item', () => {
    storageManager.setItem('user', { age: 30, name: 'John Doe' });
    const user = storageManager.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });

  it('proxyStorage should set and get an item', async () => {
    await proxyStorage.setItem('user', { age: 30, name: 'John Doe' });
    const user = await proxyStorage.getItem('user');
    expect(user).toEqual({ age: 30, name: 'John Doe' });
  });
});
