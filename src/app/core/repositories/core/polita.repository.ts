import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// services
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { GenericRepository } from '../generic.repository';
// models
import { RequestData } from 'src/app/core/models/api/request-data.model';
import { Polita } from 'src/app/core/models/api/polita/polita.model';

@Injectable()
export class PolitaRepository extends GenericRepository<Polita>  {

  constructor(http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(http, appStorageService, requestData, { link: 'api/polita/' });
  }


  updateStatus(entityID: number, statusID: number): Promise<number> {
    this.getRequestData();
    return this.http.put(this.asigurazApiLink + this.apiRoute + 'updatestatus/' + entityID + '/' + statusID, this.httpOptions)
      .toPromise()
      .then((response: any) => response as number)
      .catch(this.handleError);
  }

}
