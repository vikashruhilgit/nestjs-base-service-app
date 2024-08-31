import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(data: string | Buffer): Promise<string>;

  abstract verifyPassword(
    storedPassword: string,
    suppliedPassword: string | Buffer,
  ): Promise<boolean>;
}
