import { IsNotEmpty, IsOptional, IsArray, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class createBlogpost {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional()
  @IsOptional()
  hero_image?: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  views?: number;

  @ApiPropertyOptional()
  @IsOptional()
  visibility?: string;
}
