/**
 * Custom decorator
 */
import { SetMetadata } from '@nestjs/common';
import { REQUEST_AUTH_TYPE } from '../constants/auth.constants';
import { AuthType } from '../enum/auth-type.enum';

export const Auth = (...AuthType: AuthType[]) =>
  SetMetadata(REQUEST_AUTH_TYPE, AuthType);
