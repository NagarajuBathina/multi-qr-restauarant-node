import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodError } from "zod";

export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.issues,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors,
    });
  }
};
