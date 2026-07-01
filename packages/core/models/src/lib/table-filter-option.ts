import { PossibleFilter } from "./possible-filter";

export type TableFilterOption<T> = {
  defaultFilterProperty: keyof T;
  defaultFilterValue: string;
  objectTranslationKey: string;
  possibleFilters: PossibleFilter<T>[];
};
