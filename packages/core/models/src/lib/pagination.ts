import z from 'zod';

export enum FilterRequestOperator {
  Equal = 0,
  NotEqual = 1,
  LessThan = 2,
  LessThanOrEqual = 3,
  GreaterThan = 4,
  GreaterThanOrEqual = 5,
  Contains = 6,
  NotContains = 7,
  StartWith = 8,
  EndWith = 9,
}

export enum FilterRequestLogic {
  And = 0,
  Or = 1,
}

export type FilterRequest<T> = {
  propertyName: keyof T;
  filterOperator: FilterRequestOperator;
  value: string;
  filterLogic: FilterRequestLogic;
  filters?: FilterRequest<T>[] | undefined;
};

export type SortRequest<T> = {
  propertyName: keyof T;
  isDescending: boolean;
};

export type PaginationRequest<T> = {
  pageNumber: number;
  pageSize: number;
  sortRequests?: SortRequest<T>[] | undefined;
  filterRequest?: FilterRequest<T>[] | undefined;
};

export type PaginationResponse<T> = {
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  data: T[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ZPaginationResponse = <T extends z.ZodType<any, any>>(itemSchema: T) =>
  z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
    totalPages: z.number(),
    data: z.array(itemSchema),
  });
