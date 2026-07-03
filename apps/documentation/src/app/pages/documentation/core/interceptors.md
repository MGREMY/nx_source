---
name: Interceptors
order: 1
icon: heroDocumentMagnifyingGlass
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/interceptors'
---

# Interceptor

**@mgremy/core/interceptors** bundles reusable http interceptors.

## authInterceptor

**authInterceptor** provides a standardized way to send **Bearer** tokens throught HTTP requests. In
order to make it works, the HTTP request URL must start with the **apiUrl** variable in
**CONFIG_SERVICE**.

This is a valid configuration :

```
apiUrl = https://www.google.com
HTTP request URL = https://www.google.com/api/v1/users
```

Check [here](/documentation/core/services/introduction) to see how to setup **CONFIG_SERVICE**.

### Setup

> app.config.ts

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // ... Rest of configuration
  ],
};
```

## langInterceptor

**langInterceptor** provides a standardized way to send **Accept-Language** header throught HTTP
requests. In order to make it works, the **TRANSLATION_SERVICE** must be setup.

Check [here](/documentation/core/services/introduction) to see how to setup **TRANSLATION_SERVICE**.

### Setup

> app.config.ts

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([langInterceptor])),
    // ... Rest of configuration
  ],
};
```
