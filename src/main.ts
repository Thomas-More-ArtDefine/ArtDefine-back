import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder.service';

async function bootstrap() {

  console.log(process.env.DB_HOST);
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
