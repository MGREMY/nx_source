---
name: Utils
sourceUrl: 'https://github.com/mgremy/nx_source/tree/main/packages/core/utils'
---

# Utils

**@mgremy/core/utils** bundles variable functions usable in several places.

## hasProperty

**hasProperty** is a function that returns if an unknown object has or not a given key.

### Implementation

```typescript
export function hasProperty<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return typeof value === 'object' && value !== null && value !== undefined && key in value;
}
```

## toURLSearchParams

**toURLSearchParams** is a helper giving a generic way to append query parameters to HTTP requests.
You can create handlers and use them in order to add more functionalities.

### Implementation

```typescript
import { PaginationRequest } from '@mgremy/core/models';

type ToURLSearchParamsHandler = (params: URLSearchParams) => void;

export function toURLSearchParams(...handlers: ToURLSearchParamsHandler[]): URLSearchParams {
  const urlSearchParams = new URLSearchParams();

  handlers.forEach((handler) => handler(urlSearchParams));

  return urlSearchParams;
}

export function withPagination<T>(request: PaginationRequest<T>): ToURLSearchParamsHandler {
  return (params) => {
    params.set('pageNumber', request.pageNumber.toString());
    params.set('pageSize', request.pageSize.toString());

    if (request.sortRequests?.length)
      params.set('sortRequest', JSON.stringify(request.sortRequests));
    if (request.filterRequest?.length)
      params.set('filterRequest', JSON.stringify(request.filterRequest));
  };
}
```

### Usage

```typescript
const queryUrl: string = `${API_URI}/users?${toURLSearchParams(withPagination(paginationRequest))}`;
```

## zParse

**zParse** is a [RxJS](https://rxjs.dev) helper giving a way to parse an element using
[Zod](https://zod.dev) in a simple .pipe() handler on an observable.

### Implementation

```typescript
import { map, pipe } from 'rxjs';
import * as z from 'zod';

export function zParse<T extends z.ZodType>(zObj: T) {
  return pipe(map((data: unknown): z.infer<T> => zObj.parse(data)));
}
```

### Usage

```typescript
const user: User = this.http.get(queryUrl).pipe(zParse(ZUser));
```
