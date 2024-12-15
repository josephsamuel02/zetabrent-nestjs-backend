import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Put,
  Get,
  Delete,
  Param,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/validation/jwt-auth.guard";
import { createBlogpost, updateBlogpost } from "src/dtos";
import { ApiTags } from "@nestjs/swagger";
import { BlogpostService } from "./blogpost.service";

@ApiTags("blogpost")
@Controller("blogpost")
export class BlogpostController {
  constructor(private readonly blogpostService: BlogpostService) {}

  @Get(":id")
  public async getBlogpost(@Param("id") id: number): Promise<any> {
    return await this.blogpostService.getBlogpost(id);
  }

  @Get()
  public async getAllBlogpost(): Promise<any> {
    return await this.blogpostService.getAllBlogpost();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async uploadBlogpost(
    @Body() createBlogpost: createBlogpost,
  ): Promise<any> {
    return await this.blogpostService.uploadBlogpost(createBlogpost);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put("update")
  public async updateBlogpost(
    @Body() updateBlogpost: updateBlogpost,
  ): Promise<any> {
    return await this.blogpostService.updateBlogpost(updateBlogpost);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete("delete")
  public async deleteBlogpost(@Body() id: number): Promise<any> {
    return await this.blogpostService.deleteBlogpost(id);
  }
}
