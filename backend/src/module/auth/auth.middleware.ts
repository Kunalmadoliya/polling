import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils";
import { userTable } from "../../db/schema";
import db from "../../db/index";
import { eq } from "drizzle-orm";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw ApiError.notFound("Token not found try again later");
  }

  const decoded = verifyAccessToken(token);

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, decoded.id as string));

  if (!user) {
    throw ApiError.unauthorized("User not found");
  }
  (req as any).user = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  next();
};

const authorized = async (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      throw ApiError.forbidden(
        "You do not have permission to perform this action",
      );
    }

    next();
  };
};

export { authenticate, authorized };
