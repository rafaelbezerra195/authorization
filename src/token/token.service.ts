import { Injectable } from '@nestjs/common';
import * as sha256 from 'crypto-js/sha256';
import * as Base64 from 'crypto-js/enc-base64';
import { Credentials } from 'src/authorization/interface/credential.interface';
import { Token } from './interface/token.interface';

@Injectable()
export class TokenService {
  generate(credentials: Credentials) {
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
