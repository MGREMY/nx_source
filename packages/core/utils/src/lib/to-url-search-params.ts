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
