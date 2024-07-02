import { Injectable, UnauthorizedException } from '@nestjs/common';
import  UserService  from '../modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/modules/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    loginUserDto: LoginUserDto,
    res: any
  )  {
    try {
      const user = await this.userService.getUserByEmail(loginUserDto.email);
      const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, user.password);
      if (!isPasswordCorrect) {
        throw new UnauthorizedException(`Password is incorrect`);
      }
      const payload = { sub: user.id, email: user.email };
      
     const access_token = await this.jwtService.signAsync(payload);

     res.setHeader('X-access-token', access_token)
     return {"userId": user.id};
    
    }
    catch(err) {
      return err.message;
    }
  }
}