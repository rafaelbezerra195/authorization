import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [TokenModule, SessionModule],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
