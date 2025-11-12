// src/core/middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../apperror";

export const globalErrorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  // Handle known (custom) errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
