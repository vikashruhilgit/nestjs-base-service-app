import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { UserService } from 'src/user/providers/user.service';
import { GenerateTokenProvider } from './generate-token.provider';
import { IActiveUser } from '../interface/active-user.interface';

@Injectable()
export class RefreshTokenProvider {
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
    /**
     * Inject User Service with circular dependency
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    /**
     * Inject Generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
    try {
      /**
       * Validated refresh token
       */
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(refreshTokenDTO.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.tokenAudience,
        issuer: this.jwtConfiguration.tokenIssuer,
      });

      const user = await this.userService.findByID(sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      return this.generateTokenProvider.generateToken(user);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }
}
