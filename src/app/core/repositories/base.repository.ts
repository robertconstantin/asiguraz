import { Injectable } from '@angular/core';

import { AppStorageService } from '../services/base/app-storage.service';
import { RequestData } from '../models/api/request-data.model';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AppSession } from '../models/user/app-session.model';

@Injectable()
export class BaseRepository {


  protected userApiLink = environment.userApiLink;
  protected asigurazApiLink = environment.coreApiLink;
  protected httpOptions: any;

  constructor(protected appStorageService: AppStorageService, protected requestData: RequestData) { }

  protected getRequestData() {
    const appSession = this.appStorageService.getAppSession();
    this.requestData.session_token = appSession ? appSession.session_token : null;
    this.requestData.application_code = environment.applicationCode;

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'UserID': appSession && appSession.user ? appSession.user.user_id.toString() : '',
        'ApplicationCode': environment.applicationCode,
        'SessionToken': appSession ? appSession.session_token : ''
      })
    };
  }

  protected handleError(error: any): Promise<any> {
    // for demo purposes only
    console.error('An error occurred', error);
    // TODO logging system
    return Promise.reject(error.message || error);
  }

}
