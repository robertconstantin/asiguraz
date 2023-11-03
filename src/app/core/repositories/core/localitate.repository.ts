import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// services
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { GenericRepository } from '../generic.repository';
// models
import { RequestData } from 'src/app/core/models/api/request-data.model';
import { Localitate } from 'src/app/core/models/api/polita/localitate.model';

@Injectable({
  providedIn: 'root'
})
export class LocalitateRepository extends GenericRepository<Localitate>  {

  constructor(http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(http, appStorageService, requestData, { link: 'api/localitate/' });
  }

  getByJudet(judetCod: string): Promise<Localitate[]> {
    this.getRequestData();
    return this.http.get(this.asigurazApiLink + 'api/localitate/getByJudet/' + judetCod, this.httpOptions)
      .toPromise()
      .then((response: any) => response as Localitate[])
      .catch(this.handleError);
  }

}
