import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { User } from './user/entities/user.entity';

AdminJS.registerAdapter(AdminJSTypeorm);

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: async () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [User],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
  ],
})
export class AdminJSModule {}
