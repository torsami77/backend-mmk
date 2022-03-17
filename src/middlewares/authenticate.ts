import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken, errorResponse } from '../utils';

type JwtDecodedPayload = {
    id: number,
    username: string,
}

interface MyUserRequest extends Request {
    user?:JwtDecodedPayload
}

class Authenticate {
  static async runVerifyToken(req:MyUserRequest, res:Response, next:NextFunction) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization?.split(' ')[1];
      if (!token || token === '') {
        return errorResponse(res, 401, 'Access denied.');
      }
      const decoded:any = await verifyToken(token);
      if (!(decoded && decoded.id)) {
        return errorResponse(res, 401, 'Access denied. We could not verify user');
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }
}

export default Authenticate;
