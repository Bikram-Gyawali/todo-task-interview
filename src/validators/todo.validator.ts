import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const todoSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),
  description: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
    "string.max": "Description must not exceed 200 characters",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Invalid date format",
    "any.required": "Date is required",
  }),
  isDone: Joi.boolean(),
});

interface TodoRequestBody {
  name: string;
  description: string;
  date: string;
  isDone?: boolean;
}

export const validateToDoMiddleware = async (
  req: Request<{}, {}, TodoRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).send("No data provided");
      return;
    }
  
    const { error } = todoSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: "Validation Error",
        details: error.details.map((detail) => detail.message),
      });
      return;
    }
  
    next();
  } catch (error) {
    next(error);
  }
};
