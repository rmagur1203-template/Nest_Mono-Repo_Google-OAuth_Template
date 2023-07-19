import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Cookie } from 'reference';
import { AuthService } from './auth.service';
import { HttpExceptionRedirectFilter } from 'src/filters/http-exception.filter';
import { AccessGuard } from './guards/access.guard';
import { GoogleGuard } from './guards/google.guard';
import { RefreshGuard } from './guards/refresh.guard';

const { REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTION } = Cookie;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  hello() {
    return 'Hello World!';
  }

  @Get('/google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  @UseFilters(new HttpExceptionRedirectFilter('/auth/google', [401]))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const refreshToken = await this.authService.generateRefreshToken(req.user);
    const frontendUrl = this.config.get<string>('FRONTEND_URL');

    if (!frontendUrl) {
      throw new Error('FRONTEND_URL is not setted');
    }

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_TOKEN_OPTION());
    res.redirect(`${frontendUrl}`);
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request) {
    if (!req.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return {
      accessToken: await this.authService.generateAccessToken(req.user),
    };
  }
}
