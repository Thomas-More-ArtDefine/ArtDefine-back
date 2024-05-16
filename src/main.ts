import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder.service';

async function bootstrap() {

  console.log(process.env.DB_HOST);
  console.log(process.env.PORT);
  console.log(process.env.DB_USERNAME);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.DB_NAME);

  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  app.enableCors();
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
