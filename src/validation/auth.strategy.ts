import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/module/auth/auth.service";

require("dotenv").config();

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignorExpiration: false,
      secretOrKey: process.env.JWT_SECRETE_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    if (!payload) {
      throw new UnauthorizedException({ message: "no payload" });
    }

    const userByUserId = await this.authService.validateUser(
      payload.userId,
      payload.password,
    );

    if (!userByUserId) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return userByUserId;
  }
}
