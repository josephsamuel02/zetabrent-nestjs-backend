import { Module } from "@nestjs/common";
import { AuthModule } from "./module/auth/auth.module";
import { UserModule } from "./module/user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { BlogpostModule } from "./module/Blogpost/blogpost.module";
@Module({
  imports: [PrismaModule, UserModule, AuthModule, BlogpostModule],
})
export class AppModule {}
