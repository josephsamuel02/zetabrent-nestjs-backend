import { IsNotEmpty, IsOptional, IsArray, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class updateBlogpost {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional()
  @IsOptional()
  hero_image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  views?: number;

  @ApiPropertyOptional()
  @IsOptional()
  visibility?: string;
}
