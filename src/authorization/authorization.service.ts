import { BadRequestException, Injectable } from '@nestjs/common';
import { Credentials } from './interface/credential.interface';
import * as sha256 from 'crypto-js/sha256';
import * as Base64 from 'crypto-js/enc-base64';
import { TokenService } from '../token/token.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
  ) {}

  login(credentials: Credentials) {
    if (credentials.username != process.env.EXAMPLE_USERNAME)
      throw new BadRequestException('Unidentified username');

    const hashPassword = Base64.stringify(sha256(credentials.password));
    if (hashPassword != process.env.EXAMPLE_PASSWORD)
      throw new BadRequestException('Password is wrong');

    const token = this.tokenService.generate(credentials);

    this.sessionService.create(credentials.username, token);

    return token;
  }
}
