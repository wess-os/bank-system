import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sistema Bancário')
    .setDescription('API para gerenciamento de clientes, contas bancárias e movimentações financeiras.')
    .setVersion('1.0')
    .addServer(`http://localhost:3001`)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'JwtAuthGuard',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  console.log(`Swagger está disponível em: http://localhost:3001/api`);

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
