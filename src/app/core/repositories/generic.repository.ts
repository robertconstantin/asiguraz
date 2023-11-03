import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from '../services/base/app-storage.service';
import { RequestData } from '../models/api/request-data.model';

import { BaseRepository } from './base.repository';
import { GenericModel } from '../models/generic.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiRouteModel } from '../models/api-route.model';

@Injectable()
export class GenericRepository<TModel extends GenericModel> extends BaseRepository {

  constructor(public http: HttpClient, appStorageService: AppStorageService, requestData: RequestData, public apiRoute: ApiRouteModel) {
    super(appStorageService, requestData);
  }

  getAll(): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  getAllObs(): Observable<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link, this.httpOptions)
      .pipe(map((response: any) => response as TModel[]));
  }

  getAllByUserID(): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link + 'getallbyuserid', this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  getAllByUserIDIncludeObjects(includeObjects: string): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link + 'getallbyuserid/' + includeObjects, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link + id, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  create(item: TModel): Promise<TModel> {
    this.getRequestData();
    return this.http.post(this.asigurazApiLink + this.apiRoute.link + 'create', item, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel)
      .catch(this.handleError);
  }

  createObs(item: TModel): Observable<TModel> {
    this.getRequestData();
    return this.http.post(this.asigurazApiLink + this.apiRoute.link + 'create', item, this.httpOptions)
      .pipe(map((response: any) => response as TModel));
  }

  update(item: TModel): Promise<TModel> {
    this.getRequestData();
    return this.http.put(this.asigurazApiLink + this.apiRoute.link + 'update', item, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel)
      .catch(this.handleError);
  }

  updateObs(item: TModel): Observable<TModel> {
    this.getRequestData();
    return this.http.put(this.asigurazApiLink + this.apiRoute.link + 'update', item, this.httpOptions)
      .pipe(map((response: any) => response as TModel));
  }

  merge(item: TModel): Promise<TModel> {
    this.getRequestData();
    return this.http.post(this.asigurazApiLink + this.apiRoute.link + 'merge', item, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel)
      .catch(this.handleError);
  }


}
