import { Token } from 'src/token/interface/token.interface';

export interface AuthSession {
  username: string;
  token: Token;
  createdAt: Date;
  updatedAt: Date;
}
