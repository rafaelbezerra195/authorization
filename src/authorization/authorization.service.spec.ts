import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenModule } from '../token/token.module';
import { AuthorizationService } from './authorization.service';
import { Credentials } from './interface/credential.interface';
import { Token } from '../token/interface/token.interface';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), TokenModule],
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
});
