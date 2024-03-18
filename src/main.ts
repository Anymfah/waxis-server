import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Serve index file (.well-known)

  const config = new DocumentBuilder()
    .setTitle('Waxis API')
    .setDescription('The Waxis API description')
    .setVersion('1.0')
    .addTag('waxis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().then(() => console.log('Waxis API started'));
