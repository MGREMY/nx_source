import { FilterRequestOperator } from './pagination';

export type PossibleFilter<T> = {
  property: keyof T;
  operators: FilterRequestOperator[];
  type: 'text' | 'guid' | 'number' | 'date' | 'boolean';
};
