import { EnvironmentProviders, Injectable, InjectionToken, Provider, Type } from '@angular/core';

export const STORAGE_SERVICE = new InjectionToken<IStorageService>('STORAGE_SERVICE');

export interface IStorageService {
  getItem(key: string): string | undefined;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

@Injectable({ providedIn: 'root' })
export class StorageService implements IStorageService {
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

export function provideStorageConfig(options?: {
  service?: Type<IStorageService>;
}): (Provider | EnvironmentProviders)[] {
  return [{ provide: STORAGE_SERVICE, useClass: options?.service ?? StorageService }];
}
