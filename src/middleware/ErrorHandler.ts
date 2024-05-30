import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    res.status(statusCode).json({
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) 
    });
};