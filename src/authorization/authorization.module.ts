import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [TokenModule, SessionModule],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
