import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthtorizationMiddeware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      throw new HttpException('Authorization header missing', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new HttpException('Token missing', HttpStatus.UNAUTHORIZED);
    }

    try {
      const tokenInfo = this.jwtService.verify(token, { secret: jwtConstants.secret });

      // Request object Header, body , query, pathparam, request.header.authorization ye null nhi hai toh humko pata hai ki isme token hoga humne fetch kiya, hume pata hai token me user ki details humne send ki thi, toh verify karne ke liye vo details chahiye toh humne token verfiy karvaya, usse hume vahi details recieve hui ab hum uss details ko separate object in response object add kar denge. jab handler pe request ijayegi tb kya hoga? uske andar user as a key hoga and uski value m payload. 



      if(!req["User"])
      req["User"] = tokenInfo; 
      else 
      throw new HttpException("user object already exists",HttpStatus.BAD_REQUEST,);
      next();
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}