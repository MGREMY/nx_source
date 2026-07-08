---
name: Theme
order: 6
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/src/lib/services/theme.ts'
---

# Theme

**THEME_SERVICE** is an **InjectionToken**, handling application visual theme value and providing a
way to change it.

## Configuration

In order to configure **THEME_SERVICE**, you need to call **provideThemeConfig()**. You can give it
a custom **IThemeService** implementation.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideThemeConfig()],
};
```

This is the default **THEME_SERVICE** provider :

```typescript
export function provideThemeConfig(options?: {
  service?: Type<IThemeService>;
}): (Provider | EnvironmentProviders)[] {
  return [{ provide: THEME_SERVICE, useClass: options?.service ?? ThemeService }];
}
```
