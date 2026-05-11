import type {Request, Response, NextFunction} from "express";
import {ApiError} from "../utils/api-error";

export const validate = (DtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = DtoClass.validate(req.body);

    if (error) {
      throw ApiError.badRequest(error.join(", "));
    }

    req.body = value;
    next();
  };
};
