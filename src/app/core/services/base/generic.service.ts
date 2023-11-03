import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from './app-storage.service';
import { RequestData } from '../../models/api/request-data.model';

import { BaseService } from './base.service';
import { GenericModel } from '../../models/generic.model';
import { ApiRouteModel } from 'src/app/core/models/api-route.model';

@Injectable()
export class GenericService<TModel extends GenericModel> extends BaseService {

  constructor(public http: HttpClient, appStorageService: AppStorageService, requestData: RequestData, public apiRoute: ApiRouteModel) {
    super(appStorageService, requestData);
  }

  getAllByUserID(): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link)
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link + id)
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  getByIdWithObjects(id: number, objects: string): Promise<TModel[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link + id + '/' + objects )
      .toPromise()
      .then((response: any) => response as TModel[])
      .catch(this.handleError);
  }

  merge(item: TModel): Promise<TModel> {
    return new Promise<TModel>((resolve, reject) => {
      if (item) {
        if (item.id) {
          this.update(item).then(e => resolve(e));
        } else {
          this.create(item).then(e => resolve(e));
        }
      }
    });
  }

  create(item: TModel): Promise<TModel> {
    this.getRequestData();
    return this.http.post(this.asigurazApiLink + this.apiRoute.link + 'create', item, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel)
      .catch(this.handleError);
  }

  update(item: TModel): Promise<TModel> {
    this.getRequestData();
    return this.http.put(this.asigurazApiLink + this.apiRoute.link + 'update', item, this.httpOptions)
      .toPromise()
      .then((response: any) => response as TModel)
      .catch(this.handleError);
  }

}
