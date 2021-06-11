import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Token } from '../token/interface/token.interface';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '../token/token.module';
import { AuthorizationService } from './authorization.service';
import { Credentials } from './interface/credential.interface';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), TokenModule, SessionModule],
      providers: [AuthorizationService],
    }).compile();

    service = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be a wrong username', () => {
    const credentials: Credentials = {
      username: 'a',
      password: 'manager',
    };

    expect(() => {
      service.login(credentials);
    }).toThrow('Unidentified username');
  });

  it('should be a wrong password', () => {
    const credentials: Credentials = {
      username: 'manager',
      password: 'a',
    };

    expect(() => {
      service.login(credentials);
    }).toThrow('Password is wrong');
  });

  it('should be right credentials', () => {
    const credentials: Credentials = {
      username: 'manager',
      password: 'manager',
    };

    const token = service.login(credentials);
    expect(token).toBeTruthy();
  });

  it('should check if the access token is equal when I do login twice times', () => {
    const credentials: Credentials = {
      username: 'manager',
      password: 'manager',
    };

    const tokenFirstTime = service.login(credentials);
    const tokenSecondeTime = service.login(credentials);

    expect(tokenFirstTime).toEqual(tokenSecondeTime);
  });

  it('should check if token is valid - right acess token', () => {
    const credentials: Credentials = {
      username: 'manager',
      password: 'manager',
    };
    const token: Token = service.login(credentials);

    expect(service.tokenIsValid(token.acessToken)).toBeTruthy();
  });

  it('should check if token is valid - wrong acess token', () => {
    expect(service.tokenIsValid('0')).toBeFalsy();
  });

  it('should refresh token when a ', () => {
    const credentials: Credentials = {
      username: 'manager',
      password: 'manager',
    };
    const token: Token = service.login(credentials);
    const newerToken: Token = service.refreshToken(token);
    expect(token).toEqual(newerToken);
  });
});
