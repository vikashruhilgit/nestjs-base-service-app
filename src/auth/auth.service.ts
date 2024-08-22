import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ExampleService } from 'src/example/provider/example.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ExampleService))
    private readonly exampleService: ExampleService,
  ) {}

  login(username: string, password: string) {
    console.log(username, password);
    // do try to fetch user with
    return 'TOKEN';
  }

  isAuthenticated = () => {
    return false;
  };
}
