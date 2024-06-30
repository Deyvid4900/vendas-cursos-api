import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials:true,
    methods:["POST","GET","PUT","DELETE"]
  });

  await app.listen(3000);
}
bootstrap();
