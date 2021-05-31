import { Test, TestingModule } from '@nestjs/testing';
import { Credentials } from 'src/authorization/interface/credential.interface';
import { TokenService } from '../token/token.service';
import { AuthSession } from './interface/session.interface';
import { SessionService } from './session.service';
import { ConfigModule } from '@nestjs/config';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [SessionService],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined.', () => {
    expect(service).toBeDefined();
  });

  it('should read a empty session file.', async () => {
    const sessionList = service.getSessionList();
    expect(sessionList).toHaveLength(0);
  });

  it('should be created a new session.', () => {
    const credentials: Credentials = {
      username: 'admin',
      password: 'admin',
    };
    const tokenService = new TokenService();
    const token = tokenService.generate(credentials);
    const session = service.create(credentials.username, token);

    expect(session.createdAt).toBeTruthy();
  });

  it('should be push a new session.', () => {
    const session: AuthSession = {
      username: 'admin2',
      token: {
        acessToken: '1jh23kj1h23jkh1kj2',
        refreshToken: '1jh23kj1h23jkh1kj2',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.insertSessionList(session);
    const sessionList = service.getSessionList();

    expect(
      sessionList.some((value) => {
        return value.username === session.username;
      }),
    ).toBeTruthy();
  });

  it('should get a open session', () => {
    const username = 'admin2';
    const openSession = service.getSessionByUsername(username);
    expect(openSession).toBeTruthy();
  });

  it('should check if date is valid', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 15);

    expect(service.dateIsValid(date)).toBeTruthy();
  });
});
