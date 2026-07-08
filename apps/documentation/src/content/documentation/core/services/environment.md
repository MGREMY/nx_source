---
name: Environment
order: 1
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/src/lib/services/environment.ts'
---

# Environment

**ENVIRONMENT_VALUE** is not quite a service, but act like it. It's an **InjectionToken** used in
**CONFIG_SERVICE**, providing default configuration for several environments (e.g. dev / prod).

## Configuration

In order to configure **ENVIRONMENT_VALUE**, you need to call **provideEnvironmentConfig()** and
give it an object implementing **IEnvironment** interface.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideEnvironmentConfig({ value: environment })],
};
```

The recommended way of providing an **IEnvironment** is to use Angular's functionality to replace
files depending on the current configuration (e.g. development / production). You can then import
**environment.ts** and give it as a value.

This is the default **ENVIRONMENT_VALUE** provider :

```typescript
export function provideEnvironmentConfig(options: {
  value: IEnvironment;
}): (Provider | EnvironmentProviders)[] {
  return [{ provide: ENVIRONMENT_VALUE, useValue: options.value }];
}
```
