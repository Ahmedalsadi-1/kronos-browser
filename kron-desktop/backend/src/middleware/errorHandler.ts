import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { ErrorResponse } from '../types';

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

export const errorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const errorResponse: ErrorResponse = {
    status: 'error',
    message: config.env === 'development' ? err.message : 'Internal server error'
  };

  res.status(statusCode).json(errorResponse);
};
