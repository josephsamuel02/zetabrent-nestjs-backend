import { IsString, IsNotEmpty, IsOptional, IsEmail } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  user_name?: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
