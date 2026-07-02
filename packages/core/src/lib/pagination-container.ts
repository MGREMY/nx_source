import {
  FilterRequest,
  PaginationRequest,
  PaginationResponse,
  SortRequest,
} from '@mgremy/core/models';

import { computed, ResourceRef, signal } from '@angular/core';
import { rxResource, RxResourceOptions } from '@angular/core/rxjs-interop';

/**
 * Wrapper around PaginationRequest/PaginationResponses and RxResources used side by side with API.
 * It supports AutoRefreshing data.
 */
export class PaginationContainer<TResult> {
  /**
   * Value is computed each time pageNumber | pageSize | sortRequest (if not undefined) is updated.
   */
  private readonly _paginationRequest = computed<PaginationRequest<TResult> | undefined>(() => {
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();
    const sortRequest = this.sortRequest();
    const filterRequest = this.filterRequest();

    if (pageNumber <= 0 || pageSize <= 0) {
      return undefined;
    }

    const paginationRequest: PaginationRequest<TResult> = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortRequests: Object.entries(sortRequest)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => ({ propertyName: k, isDescending: v }) as SortRequest<TResult>),
      filterRequest: filterRequest,
    };

    return paginationRequest;
  });

  public readonly pageNumber = signal<number>(-1);
  public readonly pageSize = signal<number>(-1);
  public readonly sortRequest = signal<Record<keyof TResult, boolean | undefined>>(
    {} as Record<keyof TResult, boolean | undefined>
  );
  public readonly filterRequest = signal<FilterRequest<TResult>[]>([], {
    debugName: 'filterRequest',
    equal: () => false,
  });
  public readonly resource: ResourceRef<PaginationResponse<TResult> | undefined>;

  constructor(
    resourceOpts: Omit<
      RxResourceOptions<PaginationResponse<TResult>, PaginationRequest<TResult> | undefined>,
      'params'
    >
  ) {
    this.resource = rxResource<PaginationResponse<TResult>, PaginationRequest<TResult> | undefined>(
      {
        ...resourceOpts,
        params: () => this._paginationRequest(),
      }
    );
  }

  /**
   * Update the sort status on property from TResult.
   *
   * It goes undefined -> false -> true.
   * In terms of usage, it goes undefined -> ASC -> DESC.
   * @param propertyName The name of the property from TResult on which we want to update the sort status
   */
  public onSortChange(propertyName: keyof TResult): void {
    const current = this.sortRequest();

    this.sortRequest.set({
      ...current,
      [propertyName]:
        current[propertyName] === undefined
          ? false
          : current[propertyName] === false
            ? true
            : undefined,
    });
  }
}

export function paginationContainer<TResult>(
  resourceOpts: Omit<
    RxResourceOptions<PaginationResponse<TResult>, PaginationRequest<TResult> | undefined>,
    'params'
  >
): PaginationContainer<TResult> {
  return new PaginationContainer(resourceOpts);
}
