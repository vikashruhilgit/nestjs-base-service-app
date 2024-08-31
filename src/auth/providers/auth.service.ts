import { Injectable } from '@nestjs/common';
import { SignInDTO } from '../dtos/sign-in.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenProvider } from './refresh-token.provider';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject Sign in provider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * Inject refresh token provider
     */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  async signIn(signInDTO: SignInDTO) {
    return this.signInProvider.signIn(signInDTO);
  }

  async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
    return this.refreshTokenProvider.refreshToken(refreshTokenDTO);
  }
}
