import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { urlencoded, json } from "express";
require("dotenv").config();

async function bootstrap() {
  const port = process.env.DEV_PORT || 8080;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));

  // app.enableCors({
  //   origin: [
  //     "http://localhost:3000",
  //     "http://localhost:5173",
  //     "http://localhost:5172"
  //   ],
  // });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Zetabrent API")
    .setDescription(
      "This is the API documentation of Zetabrent backend application",
    )
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
}
bootstrap();
