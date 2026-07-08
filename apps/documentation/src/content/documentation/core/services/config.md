---
name: Config
order: 2
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/src/lib/services/app-config.ts'
---

# Config

**CONFIG_SERVICE** is an **InjectionToken**, giving a way to access the application runtime
configuration (either by environment variable or fallback to **ENVIRONMENT_VALUE**).

## Configuration

In order to configure **CONFIG_SERVICE**, you need to call **provideConfig()**. You can give it a
custom **IConfigService** implementation.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideConfig()],
};
```

This is the default **CONFIG_SERVICE** provider :

```typescript
export function provideConfig(options?: {
  service?: Type<IConfigService>;
}): (Provider | EnvironmentProviders)[] {
  return [
    { provide: CONFIG_SERVICE, useClass: options?.service ?? ConfigService },
    { provide: APP_BASE_HREF, useFactory: () => inject(CONFIG_SERVICE).appBaseHref },
  ];
}
```

## Application setup (without SSR)

The setup to make this work correctly via environment variable with the default **IConfigService**
implementation, is to wrap **bootstrapApplication** with a fetch query, which then add to
**window.runtime_config** the configuration from a file called **assets/config.json**.

This is an example for a docker deployment context :

> main.ts

```typescript
fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config) => ((window as any)['runtime_config'] = config))
  .catch(() => ((window as any)['runtime_config'] = {}))
  .finally(() => bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err)));
```

> assets/config.json

```json
{
  "APP_URL": "${APP_APP_URL}",
  "APP_BASE_HREF": "${APP_BASE_HREF}",
  "API_URL": "${APP_API_URL}",
  "DEFAULT_LANGUAGE": "${APP_DEFAULT_LANGUAGE}",
  "AUTH_URL": "${APP_AUTH_URL}",
  "AUTH_REALM": "${APP_AUTH_REALM}",
  "AUTH_CLIENT_ID": "${APP_AUTH_CLIENT_ID}"
}
```

In the dockerfile, the entrypoint must be configured to use a custom shell script, responsible to
update the **assets/config.json** file with environment variable from the container.

> entrypoint.sh

```sh
#!/bin/sh

# Replace placeholders in config.json with environment variables
envsubst < /usr/share/nginx/html/assets/config.json > /usr/share/nginx/html/assets/config.tmp && \
mv /usr/share/nginx/html/assets/config.tmp /usr/share/nginx/html/assets/config.json

# Start nginx
exec nginx -g 'daemon off;'
```
