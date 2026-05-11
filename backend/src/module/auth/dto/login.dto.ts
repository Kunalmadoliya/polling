import { BaseDto } from "../../../common/dto/base.dto";
import { z } from "zod";

export class LoginDto extends BaseDto {
  static schema = z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Enter a valid email"),

    password: z
      .string()
      .min(1, "Password is required"),
  });
}