// src/middleware/error.middleware.ts

import { Request, Response, NextFunction } from 'express';

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'APIError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends APIError {
  constructor(message: string, errors?: any[]) {
    super(400, message, errors);
    this.name = 'ValidationError';
  }
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: any[];
  stack?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });

  let statusCode = 500;
  let message = 'Internal Server Error';
//   let errorResponse: ErrorResponse = {
//     success: false,
//     message: 'Internal Server Error'
//   };

//   if (err instanceof APIError) {
//     statusCode = err.statusCode;
//     errorResponse.message = err.message;
//     if (err.errors) {
//       errorResponse.errors = err.errors;
//     }
//   } else if (err.name === 'ValidationError') {
//     statusCode = 400;
//     errorResponse.message = 'Validation Error';
//     errorResponse.errors = Object.values(err).map((e: any) => ({
//       field: e.path,
//       message: e.message
//     }));
//   } else if (err.name === 'CastError') {
//     statusCode = 400;
//     errorResponse.message = 'Invalid ID format';
//   } else if (err.name === 'MongoError' && (err as any).code === 11000) {

//     statusCode = 409;
//     errorResponse.message = 'Duplicate entry found';
//   }

//   if (process.env.NODE_ENV === 'development') {
//     errorResponse.stack = err.stack;
//   }

if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  } else if (err.name === 'MongoError' && (err as unknown as { code: number }).code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry found';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { detail: err.message })
  });};


export const notFoundHandler = (
    req: Request, 
    res: Response, 
    _next: NextFunction
  ) => {
    res.status(404).json({
      success: false,
      message: `Path ${req.originalUrl} not found`
    });
  };

export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};