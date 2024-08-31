import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { IActiveUser } from '../interface/active-user.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUser = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
