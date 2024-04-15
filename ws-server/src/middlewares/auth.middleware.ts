import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

export const authJWTMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization =
      (req as any).handshake?.headers?.auth ||
      (req as any).handshake?.headers?.auth?.token ||
      (req.header?.('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    console.log(req, Authorization);

    if (Authorization) {
      const secretKey: string = process.env.SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;

      if (verificationResponse.address) {
        req.user = verificationResponse;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log('err', error);
    next(new HttpException(401, error));
  }
};
