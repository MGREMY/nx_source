import { ActivatedRouteSnapshot, ResolveData } from '@angular/router';

/**
 * Creates a route resolver that extracts a query parameter value with type safety.
 * @param key - The query parameter key to extract
 * @param defaultValue - The default value to use if the parameter is not present
 * @returns A resolver function for use in Angular route configuration
 */
export const paramResolver = <T extends string | number | boolean>(
  key: string,
  defaultValue: T
): ResolveData => ({
  [key]: (route: ActivatedRouteSnapshot) => {
    const paramValue = route.queryParams[key];
    if (paramValue === undefined || paramValue === null) {
      return defaultValue;
    }
    // Type conversion based on defaultValue type
    if (typeof defaultValue === 'number') {
      const numValue = Number(paramValue);
      return isNaN(numValue) ? defaultValue : (numValue as T);
    }
    if (typeof defaultValue === 'boolean') {
      return (paramValue === 'true') as T;
    }
    return paramValue as T;
  },
});
