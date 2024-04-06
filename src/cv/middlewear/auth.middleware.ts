import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['auth-user'];
    if (Array.isArray(token)) {
      token = token[0];
    }
    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({
          message: 'Cannot access the resource, no auth token provided.',
        });
    }
    try {
      const decoded = verify(token, 'secretKey');
      if (typeof decoded === 'object' && 'userId' in decoded) {
        req['userId'] = decoded.userId;
        next();
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({
            message: 'Cannot access the resource, no userId in the token.',
          });
      }
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Cannot access the resource, invalid token.' });
    }
  }
}
