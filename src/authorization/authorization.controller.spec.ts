import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

describe('AuthorizationController', () => {
  let controller: AuthorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthorizationService],
      controllers: [AuthorizationController],
    }).compile();

    controller = module.get<AuthorizationController>(AuthorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
