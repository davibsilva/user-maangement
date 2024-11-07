import { Request, Response, NextFunction } from 'express';
import { sanitizeResponse } from '../utils/sanitizeResponse';

export function sanitizeMiddleware(fieldsToOmit: string[] = []) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json;

    res.json = (data: any): Response => {
      const sanitizedData = sanitizeResponse(data, fieldsToOmit);
      return originalJson.call(res, sanitizedData);
    };

    next();
  };
}
