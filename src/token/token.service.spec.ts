import { Test, TestingModule } from '@nestjs/testing';
import { Credentials } from 'src/authorization/interface/credential.interface';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be generated a new token', () => {
    const credentials: Credentials = {
      username: 'manager',
      password: 'manager',
    };

    const token = service.generate(credentials);
    expect(token.acessToken).toBeTruthy();
  });
});
