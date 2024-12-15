import { Module } from "@nestjs/common";

import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { EncryptionService } from "src/shared";
import { BlogpostService } from "./blogpost.service";
import { BlogpostController } from "./blogpost.controller";
import { BlogpostGateway } from "./blogpost.gateway";

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRETE_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPR_TIME,
      },
    }),
  ],
  exports: [BlogpostService],
  controllers: [BlogpostController],
  providers: [
    BlogpostService,
    PrismaService,
    EncryptionService,
    BlogpostGateway,
  ],
})
export class BlogpostModule {}
