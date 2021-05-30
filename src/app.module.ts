import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { TokenModule } from './token/token.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthorizationModule,
    TokenModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
