import { Body, Controller, Post } from '@nestjs/common';
import { Token } from '../token/interface/token.interface';
import { AuthorizationService } from './authorization.service';
import { Credentials } from './interface/credential.interface';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) {}

  @Post('login')
  async login(@Body() credentials: Credentials) {
    return this.authService.login(credentials);
  }

  @Post('validate-acess-token')
  async validateAccessToken(@Body() token: Token) {
    return this.authService.tokenIsValid(token.acessToken);
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: Token) {
    return this.authService.refreshToken(token);
  }
}
