import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: 'https://a7f6793219124fef9b995fa16a2d9140@o1156909.ingest.sentry.io/6238672'
  })

  await app.listen(4000);
}
bootstrap();
