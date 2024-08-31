import { Injectable } from '@nestjs/common';
import { SignInDTO } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject Sign in provider
     */
    private readonly signInProvider: SignInProvider,
  ) {}

  async signIn(signInDTO: SignInDTO) {
    return this.signInProvider.signIn(signInDTO);
  }

  isAuthenticated = () => {
    return true;
  };
}
