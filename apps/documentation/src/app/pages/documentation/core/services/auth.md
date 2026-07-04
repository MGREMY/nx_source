---
name: Auth
order: 3
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/src/lib/services/auth.ts'
---

# Auth

**AUTH_SERVICE** is an **InjectionToken**, providing a way to handle authentication in the
application.

## Configuration

In order to configure **AUTH_SERVICE**, you need to call **provideAuthConfig()**. You can give a
custom implementation of **IAuthService** and a custom **AuthConf** object, used by
**angular-oauth2-oidc**.

> The default implementation uses
> [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc) as a backend.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideAuthConfig()],
};
```

> The default **AuthConfig** is built to use keycloak as an SSO.
>
> This is the default **AUTH_SERVICE** provider :

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
