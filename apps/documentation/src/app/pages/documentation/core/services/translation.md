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

The default implementation uses [ngx-translate](https://ngx-translate.org) as a backend.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideTranslationConfig()],
};
```

This is the default **TRANSLATION_SERVICE** provider :

```typescript
export function provideAuthConfig(options?: {
  service?: Type<IAuthService>;
  authConfig?: AuthConfig;
}): (Provider | EnvironmentProviders)[] {
  return [
    provideOAuthClient(),
    {
      provide: AUTH_CONFIG,
      useFactory: () => {
        const configService = inject(CONFIG_SERVICE);

        return (
          options?.authConfig ??
          ({
            issuer: `${configService.authUrl}/realms/${configService.authRealm}`,
            clientId: configService.authClientId,
            responseType: 'code',
            scope: 'openid offline_access',
            redirectUri: configService.appUrl,
            showDebugInformation: false,
          } as AuthConfig)
        );
      },
      deps: [CONFIG_SERVICE],
    },
    { provide: AUTH_SERVICE, useClass: options?.service ?? AuthService },
    provideAppInitializer(() => inject(AUTH_SERVICE).init()),
  ];
}
```
