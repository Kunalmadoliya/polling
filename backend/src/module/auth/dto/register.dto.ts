import {BaseDto} from "../../../common/dto/base.dto";
import {z} from "zod";

export class RegisterDto extends BaseDto {
  static schema = z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),

    lastName: z.string().trim().optional(),

    email: z.string().trim().toLowerCase().email("Enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Add at least 1 uppercase letter")
      .regex(/[0-9]/, "Add at least 1 number"),

    role: z.enum(["guest", "user", "admin"]).default("user"),
  });
}
