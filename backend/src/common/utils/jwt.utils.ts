import crypto from "crypto";
import jwt from "jsonwebtoken";

type UserType = {
  id: string;
  role: string;
};

const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

// ACCESS TOKEN
export const generateAccessToken = (payload: UserType): string => {
  if (!accessSecret) throw new Error("JWT access secret missing");

  return jwt.sign(payload, accessSecret, {
    expiresIn:
      (process.env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ||
      "15m",
  });
};

export const verifyAccessToken = (token: string): UserType => {
  return jwt.verify(token, accessSecret) as UserType;
};

// REFRESH TOKEN
export const generateRefreshToken = (payload: { id: string }): string => {
  if (!refreshSecret) throw new Error("JWT refresh secret missing");

  return jwt.sign(payload, refreshSecret, {
    expiresIn:
      (process.env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ||
      "7d",
  });
};

export const verifyRefreshToken = (token: string): { id: string } => {
  return jwt.verify(token, refreshSecret) as { id: string };
};

// RESET TOKEN
export const gerateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  return { rawToken, hashToken };
};