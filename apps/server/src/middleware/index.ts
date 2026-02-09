import { Request, Response, NextFunction } from 'express';

// Logger middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// Error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// Not found middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Route not found' });
};