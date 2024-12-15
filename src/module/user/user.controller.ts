import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "src/dtos/updateUser.dto";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";
 import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get("my_profile")
  async getLoggedInUser(@Req() req: Request) {
    try {
      // const authHeader = req.headers.authorization;
      const authHeader = (req.headers as any).authorization;

      if (!authHeader) {
        throw new HttpException(
          "Authorization header missing",
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Extract and verify the JWT token
      const token = authHeader.split(" ")[1];
      if (!token) {
        return new HttpException("Token missing", HttpStatus.UNAUTHORIZED);
      }

      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRETE_KEY,
      });
      return this.userService.getLogedinUser(decoded);
    } catch (error) {
      // Handle and log errors
      throw new HttpException(
        error.message || "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get("user")
  getUserById(@Body() data: string) {
    return this.userService.getUserById(data);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("all_users")
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("update_user")
  updateUserById(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(updateUserDto);
  }

 

 

 
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Delete("delete_account")
  // deleteUser(@Body("id") updateUserDto: UpdateUserDto) {
  //   return this.userService.deleteUser(updateUserDto);
  // }
}
