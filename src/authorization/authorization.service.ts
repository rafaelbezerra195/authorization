import { BadRequestException, Injectable } from '@nestjs/common';
import { Credentials, Token } from './interface/credential.interface';
import * as sha256 from 'crypto-js/sha256';
import * as Base64 from 'crypto-js/enc-base64';

@Injectable()
export class AuthorizationService {
  login(credentials: Credentials) {
    if (credentials.username != process.env.EXAMPLE_USERNAME)
      throw new BadRequestException('Unidentified username');

    const hashPassword = Base64.stringify(sha256(credentials.password));
    if (hashPassword != process.env.EXAMPLE_PASSWORD)
      throw new BadRequestException('Password is wrong');

    const token = this.generateToken(credentials);
    
  }

  generateToken(credentials: Credentials) {
    const newToken: Token = {
      acessToken: Base64.stringify(
        sha256(credentials.username + credentials.password + Date.now()),
      ),
      refreshToken: Base64.stringify(
        sha256(Date.now() + credentials.username + credentials.password),
      ),
    };
    return newToken;
  }
}
