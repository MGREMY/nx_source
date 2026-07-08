---
name: Guards
icon: heroLockClosed
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/guards'
---

# Guards

**@mgremy/core/guards** bundles reusable route guards for routing.

## authGuard

**authGuard** and **notAuthGuard** provides a standardized way to check if the user is authenticated
or not.

It uses **AUTH_SERVICE** to check if the current user is authenticated.

### Usage

```typescript
export default [
  {
    path: 'some-strictly-private-path',
    canActivate: [authGuard],
  },
  {
    path: 'some-strictly-public-route',
    canActivate: [notAuthGuard],
    data: {
      notAuthGuard: {
        returnPath: ['/', 'some', 'return', 'path'],
      },
    },
  },
  {
    path: 'some-other-strictly-public-route',
    canActivate: [notAuthGuard],
    data: {
      notAuthGuard: {
        returnPath: '/some/return/path',
      },
    },
  },
] as Routes;
```

> If **authGuard** fails, it triggers the **login()** fuction from **AUTH_SERVICE**
>
> If **notAuthGuard** fails, it redirect to the **returnPath** value or **/** not provided

### Parameters

|    name    |            type            | default value | available values |
| :--------: | :------------------------: | :-----------: | :--------------: |
| returnPath | **string** \| **string[]** |   **['/']**   |       ---        |

## hasRoleGuard

**hasRoleGuard** provides a standardized way to check if the user has request roles.

### Usage

```typescript
export default [
  {
    path: 'some-role-protected-route',
    canActivate: [hasRoleGuard],
    data: {
      hasRoleGuard: {
        mode: 'any',
        roles: ['admin'],
      },
    },
  },
  {
    path: 'some-other-role-protected-route',
    canActivate: [hasRoleGuard],
    data: {
      hasRoleGuard: {
        mode: 'all',
        roles: ['admin', 'superadmin'],
      },
    },
  },
] as Routes;
```

> If **hasRoleGuard** fails, it returns **false**, cancelling navigation.

### Parameters

| name |    type    | default value |  available values  |
| :--: | :--------: | :-----------: | :----------------: |
| mode | **string** |    **any**    | **any** \| **all** |
