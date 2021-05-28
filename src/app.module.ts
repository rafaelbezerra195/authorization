import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationService } from './authorization/authorization.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [AuthorizationService],
})
export class AppModule {}
