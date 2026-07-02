import { map, pipe } from 'rxjs';
import * as z from 'zod';

export function zParse<T extends z.ZodType>(zObj: T) {
  return pipe(map((data: unknown): z.infer<T> => zObj.parse(data)));
}
