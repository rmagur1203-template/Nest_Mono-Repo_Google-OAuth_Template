import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { AdminJSModule } from './jsadmin.module';
import { ConfigValidator } from './validators/config';
import ms from 'ms';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`../../.env`, `.env`],
      validationSchema: ConfigValidator,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        ttl: ms(config.get<string>('CACHE_TTL', '5s')),
        max: config.get<number>('CACHE_MAX', 100),
      }),
      inject: [ConfigService],
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
