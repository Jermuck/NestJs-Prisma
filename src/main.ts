import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as  cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './infrastructure/common/interceptors/LoggerInterceptor/logger.interceptor';
import { ResponseInterceptor } from './infrastructure/common/interceptors/ResponseInterceptor/Response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Backend develpment')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(3000);
  console.log("Server was started...");
};
bootstrap();
