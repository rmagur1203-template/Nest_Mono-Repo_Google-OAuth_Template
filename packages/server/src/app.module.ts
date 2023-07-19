import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { AdminJSModule } from './jsadmin.module';
import { ConfigValidator } from './validators/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../.env`, `.env`],
      validationSchema: ConfigValidator,
    }),
    DatabaseModule,
    AdminJSModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
