import * as z from 'zod';

export type ErrorResponse = {
  errors: Record<string, string[]>;
  message: string;
  statusCode: number;
};

export const ZErrorResponse: z.ZodType<ErrorResponse> = z.object({
  errors: z.record(z.string(), z.array(z.string())),
  message: z.string(),
  statusCode: z.number(),
});
