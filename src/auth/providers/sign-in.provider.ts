/**
 * JWT
 * https://jwt.io/
 */

import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO } from '../dtos/signin.dto';
import { UserService } from 'src/user/providers/user.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject User Service with circular dependency
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * Inject hashing service to authenticate user
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * Inject jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * Inject Jwt config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signIn(signInDTO: SignInDTO) {
    const user = await this.userService.findUserByEmail(signInDTO.email);

    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.verifyPassword(
        signInDTO.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, "couldn't verify the password");
    }

    if (isEqual) {
      const assessToken = await this.jwtService.signAsync(
        {
          sud: user.id,
          email: user.email,
        },
        {
          audience: this.jwtConfiguration.tokenAudience,
          issuer: this.jwtConfiguration.tokenIssuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );

      return { assessToken };
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
