import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { AppStorageService } from '../base/app-storage.service';

import { ApiLinks } from '../../constants/api-links.const';
import { AppSession } from '../../models/user/app-session.model';
import { RequestData } from '../../models/api/request-data.model';

import { User } from '../../models/user/user.model';
import { UserLogin } from '../../models/user/user-login.model';
import { UserRegister } from '../../models/user/user-register.model';
import { UserCreate } from '../../models/user/user-create.model';
import { UserUpdate } from '../../models/user/user-update.model';
import { BaseService } from '../base/base.service';


@Injectable()
export class UserService extends BaseService {

  constructor(private http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(appStorageService, requestData);
   }

  get(): Promise<AppSession> {
    this.getRequestData();
    return this.http.post(this.apiLink + ApiLinks.User.Get, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as AppSession;
      })
      .catch(this.handleError);
  }

  getByConfirmData(user: string, code: string): Promise<User> {
    this.getRequestData();
    this.requestData.data = { user_secret: user, validation_code: code};
    return this.http.post(this.apiLink + ApiLinks.User.GetByConfirmData, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as User;
      })
      .catch(this.handleError);
  }

  login(userLogin: UserLogin): Promise<AppSession> {
    this.getRequestData();
    this.requestData.data = userLogin;
    return this.http.post(this.apiLink + ApiLinks.User.Login, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as AppSession;
      })
      .catch(this.handleError);
  }

  logout(): Promise<boolean> {
    this.getRequestData();
    return this.http.post(this.apiLink + ApiLinks.User.Logout, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  forgotPassword(data: string): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {email: data};
    return this.http.post(this.apiLink + ApiLinks.User.ForgotPassword, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  changePassword(data: string): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {new_password: data};
    return this.http.post(this.apiLink + ApiLinks.User.ChangePassword, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  checkAvailability(data: string): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {email: data};
    return this.http.post(this.apiLink + ApiLinks.User.CheckAvailability, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  register(userRegister: UserRegister): Promise<AppSession> {
    this.getRequestData();
    this.requestData.data = userRegister;
    return this.http.post(this.apiLink + ApiLinks.User.Register, this.requestData)
      .toPromise()
      .then((response: any) => {
        const session = response.response as AppSession;
        this.appStorageService.setAppSession(session, false);
        return session;
      })
      .catch(this.handleError);
  }

  subscribeUser(userRegister: UserRegister): Promise<AppSession> {
    this.getRequestData();
    this.requestData.data = userRegister;
    return this.http.post(this.apiLink + ApiLinks.User.SubscribeUser, this.requestData)
      .toPromise()
      .then((response: any) => {
        const session = response.response as AppSession;
        this.appStorageService.setAppSession(session, false);
        return session;
      })
      .catch(this.handleError);
  }

  create(data: UserCreate): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.apiLink + ApiLinks.User.Create, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  update(userUpdate: UserUpdate): Promise<AppSession> {
    this.getRequestData();
    this.requestData.data = userUpdate;
    return this.http.post(this.apiLink + ApiLinks.User.Update, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as AppSession;
      })
      .catch(this.handleError);
  }

  updateProfilePicture(data: string): Promise<AppSession> {
    this.getRequestData();
    this.requestData.data = { profile_picture: data};
    return this.http.post(this.apiLink + ApiLinks.User.UpdateProfilePicture, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  updatelanguage(defaultLanguage: string): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {default_language: defaultLanguage};
    return this.http.post(this.apiLink + ApiLinks.User.UpdateLanguage, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  confirmEmail(user: string, code: string): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = { user_secret: user, validation_code: code};
    return this.http.post(this.apiLink + ApiLinks.User.ConfirmEmail, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  confirmInvite(user: string, code: string, password: string): Promise<AppSession> {
    this.getRequestData();
    this.requestData.data = { user_secret: user, validation_code: code, password};
    return this.http.post(this.apiLink + ApiLinks.User.ConfirmInvite, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as AppSession;
      })
      .catch(this.handleError);
  }

  resendConfirmUserEmail(): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = null;
    return this.http.post(this.apiLink + ApiLinks.User.ResendConfirmUserEmail, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  resetPassword(user: string, code: string, pass: string): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = { user_secret: user, validation_code: code, new_password: pass};
    return this.http.post(this.apiLink + ApiLinks.User.ResetPassword, this.requestData)
      .toPromise()
      .then((response: any) => {
        const result = response;
        if (result.has_error) {
          console.error('error api=', result.errors);
        }
        return result.response as boolean;
      })
      .catch(this.handleError);
  }

  // TODO verifysecuritycode
}
