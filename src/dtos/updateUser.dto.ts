import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEmail,
  IsObject,
  IsBoolean,
  IsArray,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

interface Following {
  user_name: string;
  userId: string;
}

interface Followers {
  user_name: string;
  userId: string;
}

interface Socials {
  facebook?: string;
  x_social?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  patreon?: string;
  linkedin?: string;
}
interface Address {
  country: string;
  street: string;
  city?: string;
  state: string;
  zip?: string;
  ip_address?: string;
}

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  user_name?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  first_name?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  last_name?: string;

  @IsDateString()
  @ApiPropertyOptional()
  @IsOptional()
  date_of_birth?: Date;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  address?: Address;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  profile_img?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  profile_poster_img?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  about?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  art_focus?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  website: string[];

  @IsObject()
  @ApiPropertyOptional()
  @IsOptional()
  socials?: Socials;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  country?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  state?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  time_zone?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional()
  @IsOptional()
  profession?: string[];

  @IsObject()
  @ApiPropertyOptional()
  @IsOptional()
  following?: Following;

  @IsObject()
  @ApiPropertyOptional()
  @IsOptional()
  followers?: Followers;

  @IsObject()
  @ApiPropertyOptional()
  @IsOptional()
  likes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  interests?: string[];

  @IsString()
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  hubby?: string[];

  @IsObject()
  @ApiPropertyOptional()
  @IsOptional()
  Post?: object;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  moodboard?: object;

  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  suspended?: boolean;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  authStrategy?: string;

  @IsObject()
  @ApiPropertyOptional()
  @IsOptional()
  Store?: object;
}
