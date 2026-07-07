---
name: Resolvers
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/resolvers'
---

# Resolvers

**@mgremy/core/resolvers** bundles reusable resolvers which you can use in route definitions.

## paramResolver

`paramResolver` provides a way to bind query parameters to component's **input** variables, with a
possible **defaultValue** as a fallback if the value is not provided. It can be usefull for
component's with a required input when used in template, but if used with routes, it can works all
alone. It keeps the component's free of manual value fallback while keeping the input as required.

## Usage

```typescript
export default [
  {
    path: '',
    component: UserListPage,
    resolve: {
      ...paramResolver('pageNumber', 1),
      ...paramResolver('pageSize', 15),
    },
  },
] as Routes;
```

```typescript
export class UserListPage {
  // ...
  public readonly pageNumber = model.required<number>();
  public readonly pageSize = model.required<number>();
  // ...
}
```
