import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as compression from 'compression';

const PORT = parseInt(process.env.PORT, 10) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // register all plugins and extension
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({ type: VersioningType.URI });
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   index: false,
  //   prefix: '/public',
  // });
  // app.use(compression);
  //=======>swagger config<<=========
  const config = new DocumentBuilder()
    .setTitle('Khount API')
    .setDescription('The Khount api API description')
    .setVersion('1.0')
    // .addTag('API')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`);
  });
}
bootstrap();
