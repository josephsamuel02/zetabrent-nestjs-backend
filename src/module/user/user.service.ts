import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateUserDto } from "src/dtos/updateUser.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getLogedinUser(data) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userId: data.userId,
        },
      });

      if (!user) {
        return new NotFoundException("user not found");
      }

      return { status: "success", data: user };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async updateUserById(updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          userId: updateUserDto.userId,
        },
        data: updateUserDto,
      });

      if (!updateUser) {
        throw new BadRequestException({
          message: "failed to update user",
          status: "failed",
        });
      }
      return { status: "success", data: updateUser };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!user) {
        throw new NotFoundException("user not found");
      }

      return { status: "success", data: user };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  // Admin Endpoints
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();

      if (!users) {
        throw new NotFoundException("not found");
      }

      return { status: "success", data: users };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
