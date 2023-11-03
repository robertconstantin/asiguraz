import { Injectable } from '@angular/core';

import { AppStorageService } from './app-storage.service';
import { RequestData } from '../../models/api/request-data.model';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable()
export class BaseService {


  protected apiLink = environment.userApiLink;
  // protected asigurazApiLink = environment.userApiLink + '/apis/dorequest/';
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
        'UserID': appSession && appSession.user ? appSession.user.user_id.toString() : null,
        'ApplicationCode': environment.applicationCode,
        'SessionToken': appSession ? appSession.session_token : null
      })
    };
  }

  protected handleError(error: any): Promise<any> {
    // for demo purposes only
    console.error('An error occurred', error);
    // TODO logging system
    return Promise.reject(error.message || error);
  }

  protected handleErrorObservable(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
