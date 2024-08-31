import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokenProvider } from './generate-token.provider';
import { SignInDTO } from '../dtos/sign-in.dto';

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
     * Inject Generate token provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
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

    if (!isEqual) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return await this.generateTokenProvider.generateToken(user);
  }
}
