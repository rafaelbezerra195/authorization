import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [TokenModule],
  providers: [AuthorizationService],
  controllers: [],
})
export class AuthorizationModule {}
