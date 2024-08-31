import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { AuthType } from './enum/auth-type.enum';
import { Auth } from './decorator/auth.decorator';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Inject auth service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDTO: SignInDTO) {
    return await this.authService.signIn(signInDTO);
  }

  @Post('refresh-token')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return await this.authService.refreshToken(refreshTokenDTO);
  }
}
