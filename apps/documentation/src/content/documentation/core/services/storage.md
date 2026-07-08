---
name: Storage
order: 4
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/src/lib/services/storage.ts'
---

# Storage

**STORAGE_SERVICE** is an **InjectionToken**, providing a way to store user or application data, and
to retrieve it.

## Configuration

In order to configure **STORAGE_SERVICE**, you need to call **provideStorageConfig()**. You can give
it a custom **IStorageService** implementation.

> The default implementation uses **localStorage** provided by the browser.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideStorageConfig()],
};
```

This is the default **STORAGE_SERVICE** provider :

```typescript
export function provideStorageConfig(options?: {
  service?: Type<IStorageService>;
}): (Provider | EnvironmentProviders)[] {
  return [{ provide: STORAGE_SERVICE, useClass: options?.service ?? StorageService }];
}
```
