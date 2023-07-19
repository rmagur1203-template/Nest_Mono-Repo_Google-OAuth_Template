import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async isUserExistByEmail(email: string): Promise<boolean> {
    return !!(await this.userRepository.findOneBy({ email }));
  }

  public async isUserExistById(id: string): Promise<boolean> {
    return !!(await this.userRepository.findOneBy({ id }));
  }

  public async generateRefreshToken(user: Pick<User, 'id'>): Promise<string> {
    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );

    await this.userRepository.update({ id: user.id }, { refreshToken: token });

    return token;
  }

  public async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        select: ['id', 'refreshToken'],
      });
      const token = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      if (!user || !token) {
        return false;
      }

      return token.id === user.id && refreshToken === user.refreshToken;
    } catch {
      return false;
    }
  }

  public async generateAccessToken(user: Pick<User, 'id'>): Promise<string> {
    return await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
  }

  public async validateAccessToken(
    userId: string,
    accessToken: string,
  ): Promise<boolean> {
    try {
      const { id } = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      return id === userId;
    } catch {
      return false;
    }
  }
}
