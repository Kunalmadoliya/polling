import * as authService from "./auth.service";
import type { Request, Response } from "express";
import { ApiResponse } from "../../common/utils/api-response";
import { ApiError } from "../../common/utils/api-error";
import type { AuthRequest } from "../../types/express";

const register = async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  return ApiResponse.ok(res, "Account created successfully", { user });
};

const login = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return ApiResponse.ok(res, "Login successful", { user, accessToken });
};

const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw ApiError.unauthorized("Session expired. Please login again");
  }

  const accessToken = await authService.issueAccessToken(token);

  return ApiResponse.ok(res, "Session refreshed", { accessToken });
};

const logout = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw ApiError.unauthorized("Unauthorized request");
  }

  await authService.logout(req.user.id);

  res.clearCookie("refreshToken");

  return ApiResponse.ok(res, "Logged out successfully");
};

export { register, login, refreshToken, logout };
