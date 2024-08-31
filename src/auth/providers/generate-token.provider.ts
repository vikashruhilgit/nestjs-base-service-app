/**
 * JWT
 * https://jwt.io/
 */

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { IActiveUser } from '../interface/active-user.interface';
import { User } from 'src/user/user.entity';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    /**
     * Inject Jwt Service
     */
    private readonly jwtService: JwtService,

    /**
     * Inject Jwt Config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.tokenAudience,
        issuer: this.jwtConfiguration.tokenIssuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      },
    );
  }

  public async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      /**
       * Generate access token
       */
      this.signToken<Partial<IActiveUser>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        },
      ),
      /**
       * Generate refresh token
       */
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
