---
name: Translation
order: 5
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/src/lib/services/translation.ts'
---

# Translation

**TRANSLATION_SERVICE** is an **InjectionToken**, providing a way to store user or application data,
and to retrieve it.

## Configuration

In order to configure **TRANSLATION_SERVICE**, you need to call **provideTranslationConfig()**. You
can give it a custom **ITranslationService** implementation.

> The default implementation uses [ngx-translate](https://ngx-translate.org) as a backend.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideTranslationConfig()],
};
```

This is the default **TRANSLATION_SERVICE** provider :

```typescript
export function provideTranslationConfig(options?: {
  service?: Type<ITranslationService>;
}): (Provider | EnvironmentProviders)[] {
  registerLocaleData(localeFR);
  registerLocaleData(localeUS);

  return [
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n', suffix: '.json' }),
    }),
    { provide: TRANSLATION_SERVICE, useClass: options?.service ?? TranslationService },
    provideAppInitializer(() => inject(TRANSLATION_SERVICE).init()),
  ];
}
```
