import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../../.env`, `.env`],
    }),
    HelloModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
