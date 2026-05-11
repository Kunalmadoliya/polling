import {
  pgTable,
  varchar,
  uuid,
  pgEnum,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  firstName: varchar("first_name", {length: 45}).notNull(),
  lastName: varchar("last_name", {length: 45}),

  email: varchar("email", {length: 322}).notNull().unique(),

  password: varchar("password", {length: 255}).notNull(),

  role: rolesEnum("role").default("guest").notNull(),

  isVerified: boolean("is_verified").default(false).notNull(),

  verificationToken: varchar("verification_token", {length: 255}),
  refreshToken: varchar("refresh_token", {length: 255}),
  resetPasswordToken: varchar("reset_password_token", {length: 255}),

  resetPasswordExpires: timestamp("reset_password_expires"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
