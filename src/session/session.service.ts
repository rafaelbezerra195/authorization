import { Injectable } from '@nestjs/common';
import { Token } from 'src/token/interface/token.interface';
import * as fs from 'fs';
import { AuthSession } from './interface/session.interface';

@Injectable()
export class SessionService {
  create(username: string, token: Token): AuthSession {
    const newSession = {
      username,
      token,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.insertSessionList(newSession);

    return newSession;
  }

  getSessionList() {
    if (!fs.existsSync(process.env.SESSION_FILE)) return [];

    const sessionList = JSON.parse(
      fs.readFileSync(process.env.SESSION_FILE, 'utf8'),
    );

    return sessionList;
  }

  getSessionByUsername(username: string): AuthSession {
    const sessionList = this.getSessionList();

    return sessionList.find(
      (session: AuthSession) =>
        session.username === username && this.dateIsValid(session.createdAt),
    );
  }

  getSessionByAcessToken(acessToken: string): AuthSession {
    const sessionList = this.getSessionList();

    return sessionList.find(
      (session: AuthSession) =>
        session.token.acessToken === acessToken &&
        this.dateIsValid(session.createdAt),
    );
  }

  insertSessionList(newSession: AuthSession) {
    const sessionList = this.getSessionList();
    sessionList.push(newSession);

    fs.writeFileSync(process.env.SESSION_FILE, JSON.stringify(sessionList));
  }

  dateIsValid(date: Date) {
    try {
      const now = new Date();
      const maxDate = new Date(date);
      maxDate.setMinutes(
        maxDate.getMinutes() + parseInt(process.env.SESSION_EXPIRATION_TIME),
      );

      return now.getTime() < maxDate.getTime();
    } catch (e) {
      return false;
    }
  }
}
