import { InjectionToken } from '@angular/core';

export const APP_STORAGE_SERVICE = new InjectionToken<IStorageService>('APP_STORAGE_SERVICE');

export interface IStorageService {
  getItem(key: string): string | undefined;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}
