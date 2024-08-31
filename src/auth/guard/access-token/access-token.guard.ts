import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * inject jwt service
     */
    private readonly jwtService: JwtService,

    /**
     * Inject Jwt configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * Extract request from context
     */
    const request = context.switchToHttp().getRequest();
    /**
     * extract token from request
     */
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      /**
       * Validate the token
       */
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process request at this moment.',
        {
          description: error,
        },
      );
    }

    return true;
  }

  private extractTokenFromRequest(request: Request) {
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
