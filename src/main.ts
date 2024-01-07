/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  // here by default the bodyParser: true so no need to use it.
  //const app = await NestFactory.create(AppModule, { bodyParser: true });
  const app = await NestFactory.create(AppModule,
    {
      rawBody: true
    }
  );

  app.enableCors();


  const PORT = 3030;
  const HOST = '0.0.0.0';

  await app.listen(PORT, HOST, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);

  });
  console.log(await app.getUrl());

}
bootstrap();
