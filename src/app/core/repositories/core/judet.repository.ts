import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// services
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { GenericRepository } from '../generic.repository';
// models
import { RequestData } from 'src/app/core/models/api/request-data.model';
import { Judet } from 'src/app/core/models/api/polita/judet.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JudetRepository extends GenericRepository<Judet>  {

  constructor(http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(http, appStorageService, requestData, { link: 'api/judet/' });
  }

  getAllAllow(): Promise<Judet[]> {
    console.log('GenericRepository.getAllObs');
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + this.apiRoute.link + 'getall', this.httpOptions)
    .toPromise()
    .then((response: any) => response as Judet[])
    .catch(this.handleError);
  }

}
