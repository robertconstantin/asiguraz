import { Injectable } from '@angular/core';
import { AppSession } from '../../models/user/app-session.model';
import { CookieService } from 'ngx-cookie';
import { User } from '../../models/user/user.model';

@Injectable()
export class AppStorageService {

  constructor( private cookieService: CookieService ) { }

  get(name: string) {
    const item = localStorage.getItem(name);
    if (!item || item === 'undefined' || item === 'null' || item === null) {
      return null;
    } else {
      return JSON.parse(item);
    }
  }

  getString(name: string) {
    const item = localStorage.getItem(name);
    if (!item || item === 'undefined' || item === 'null' || item === null) {
      return '';
    } else {
      return  JSON.parse(item);
    }
  }

  getModel<T>(name: string, type: { new(): T ; } ): T {
    const item = localStorage.getItem(name);
    if (!item || item === 'undefined' || item === 'null' || item === null) {
      return new type();
    } else {
      return JSON.parse(item) as T;
    }
  }

  set(name: string, item: any) {
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(item));
  }

  getAppSession() {
    const item = sessionStorage.getItem('session');
    if (!item || item === 'undefined' || item === 'null' || item === null) {
      const itemCookie = this.cookieService.getObject('session') as AppSession;
      if (itemCookie && itemCookie !== null) {
        return itemCookie;
      } else {
        return null;
      }
    } else {
      return JSON.parse(item) as AppSession;
    }
  }

  setAppSession(item: AppSession, userRememberMe: boolean) {
    if (userRememberMe) {
      const d = new Date();
      const exdays = 30;
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const options = {
        path: null,
        domain: null,
        expires: d.toUTCString(),
        secure: false,
        httpOnly: false,
        storeUnencoded: false
      };
      this.cookieService.putObject('session', item, options);
    } else {
      sessionStorage.setItem('session', JSON.stringify(item));
    }
  }

  removeAppSession() {
    this.cookieService.removeAll();
    sessionStorage.clear();
    localStorage.clear();
  }

  isUserLoggedIn(): User {
    const appSession = this.getAppSession();
    const user = appSession ? appSession.user : null;
    return user;
  }

  // TODO NICE
  // //const ceva = Base64.encode('ahas');
  // const cipher = crypto.subtle;
  // var crypted = cipher.encrypt('utf8','hex')
  // crypted += cipher.final('hex');
  // return crypted;
}
