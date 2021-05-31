import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { Credentials } from './interface/credential.interface';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) {}

  @Post()
  async login(@Body() credentials: Credentials) {
    return this.authService.login(credentials);
  }
}
