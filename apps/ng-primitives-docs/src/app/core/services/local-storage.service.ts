import { IStorageService } from '@mgremy/core';

export class LocalStorageService implements IStorageService {
  getItem(key: string): string | undefined {
    return localStorage.getItem(key) ?? undefined;
  }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
