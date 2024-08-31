import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_AUTH_TYPE } from 'src/auth/constants/auth.constants';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enum/auth-type.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    /**
     * Inject Reflector
     */
    private readonly reflector: Reflector,

    /**
     * Inject Access Token Guard
     */
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      REQUEST_AUTH_TYPE,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];
    // Show what are authTypes

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // print Guards => Show that the user can pass an array in users controller as well

    // Declare the default error
    let error = new UnauthorizedException();

    for (const instance of guards) {
      // print each instance
      // Declare a new constant
      const canActivate = await Promise.resolve(
        // Here the AccessToken Guard Will be fired and check if user has permissions to acces
        // Later Multiple AuthTypes can be used even if one of them returns true
        // The user is Authorized to access the resource
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      // Display Can Activate
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
