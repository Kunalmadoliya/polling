import { z } from "zod";

export class BaseDto {
  static schema = z.object({});

  static validate<T>(
    this: { schema: z.ZodType<T> },
    data: unknown,
  ): {
    error: string[] | null;
    value: T | null;
  } {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      return {
        error: result.error.issues.map((e) => e.message),
        value: null,
      };
    }

    return {
      error: null,
      value: result.data,
    };
  }
}
