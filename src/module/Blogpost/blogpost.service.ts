import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { createBlogpost, updateBlogpost } from "src/dtos";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BlogpostService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger("createUser");

  async test(data: any) {
    this.logger.log("test");
    return data;
  }

  public async getBlogpost(id: number): Promise<any> {
    try {
      const blogpost = await this.prisma.blogpost.findUnique({
        where: { id: Number(id) },
      });

      if (!blogpost) {
        return {
          data: [],
          message: "No blogpost found",
        };
      }

      return {
        status: 200,
        message: "blogpost fetched successfully",
        data: blogpost,
      };
    } catch (error) {
      console.error("Error fetching blogpost  ", error); // Log the error for debugging

      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async getAllBlogpost(): Promise<any> {
    try {
      const blogpost = await this.prisma.blogpost.findMany();

      if (blogpost.length === 0) {
        return {
          data: [],
          message: "No artworks",
        };
      }

      return {
        status: 200,
        message: "blogpost fetched successfully",
        data: blogpost,
      };
    } catch (error) {
      console.error("Error fetching blogpost  ", error); // Log the error for debugging

      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async uploadBlogpost(createBlogpost: createBlogpost): Promise<any> {
    try {
      const newBlogpost = await this.prisma.blogpost.create({
        data: createBlogpost,
      });
      if (!newBlogpost) {
        throw new BadRequestException({
          message: "Unable to upload blogpost",
        });
      }

      return {
        status: 200,
        message: "Blogpost updated successfully",
        data: newBlogpost,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async updateBlogpost(UpdateBlogpost: updateBlogpost): Promise<any> {
    try {
      const newBlogpost = await this.prisma.blogpost.update({
        where: { id: UpdateBlogpost.id },
        data: UpdateBlogpost,
      });

      if (!newBlogpost) {
        throw new BadRequestException({
          message: "Unable to upload blogpost",
        });
      }

      return {
        status: 200,
        message: "Blogpost updated successfully",
        data: newBlogpost,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }

  public async deleteBlogpost(id: number): Promise<any> {
    try {
      const blogpost = await this.prisma.blogpost.findUnique({
        where: { id: id },
      });

      if (!blogpost) {
        throw new UnauthorizedException({
          message: "You are not authorized to delete this blogpost",
        });
      }

      await this.prisma.blogpost.delete({
        where: { id: id },
      });

      return {
        status: 200,
        message: "Blogpost deleted successfully",
        id: id,
      };
    } catch (error) {
      throw new BadRequestException({
        error: error.message,
      });
    }
  }
}
