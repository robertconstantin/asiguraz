import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from '../base/app-storage.service';
import { ApiLinks } from '../../constants/api-links.const';
import { RequestData } from '../../models/api/request-data.model';
import { BaseService } from '../base/base.service';
// models
import { TipInmatriculare } from '../../models/api/types/tip-inmatriculare.model';
import { TipUtilizare } from '../../models/api/types/tip-utilizare.model';
import { Combustibil } from '../../models/api/types/combustibil.model';
import { ClasaBmAnterioara } from '../../models/api/types/clasa-bm-anterioara.model';

@Injectable()
export class TypeService extends BaseService {

  constructor(private http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(appStorageService, requestData);
   }

  getRegisterType(): Promise<TipInmatriculare[]> {
    this.getRequestData();
    return this.http.post(this.apiLink + ApiLinks.Type.GetRegisterType, this.requestData)
      .toPromise()
      .then((response: any) => response.response as TipInmatriculare[])
      .catch(this.handleError);
  }

  getUsageType(): Promise<TipUtilizare[]> {
    this.getRequestData();
    return this.http.post(this.apiLink + ApiLinks.Type.GetUsageType, this.requestData)
      .toPromise()
      .then((response: any) => response.response as TipUtilizare[])
      .catch(this.handleError);
  }

  getFuel(): Promise<Combustibil[]> {
    this.getRequestData();
    return this.http.post(this.apiLink + ApiLinks.Type.GetFuel, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Combustibil[])
      .catch(this.handleError);
  }

  getBmClass(): Promise<ClasaBmAnterioara[]> {
    this.getRequestData();
    return this.http.post(this.apiLink + ApiLinks.Type.GetBmClass, this.requestData)
      .toPromise()
      .then((response: any) => response.response as ClasaBmAnterioara[])
      .catch(this.handleError);
  }


  // getRegisterType(): Observable<TipInmatriculare[]> {
  //   this.getRequestData();
  //   return this.http.post<TipInmatriculare[]>(this.apiLink + ApiLinks.Type.GetRegisterType, this.requestData)
  //   .pipe(
  //     catchError(this.handleErrorObservable)
  //   );
  // }

  // getUsageType(): Observable<TipUtilizare[]> {
  //   this.getRequestData();
  //   return this.http.post<TipUtilizare[]>(this.apiLink + ApiLinks.Type.GetUsageType, this.requestData)
  //   .pipe(
  //     catchError(this.handleErrorObservable)
  //   );
  // }

  // getFuel(): Observable<Combustibil[]> {
  //   this.getRequestData();
  //   return this.http.post<Combustibil[]>(this.apiLink + ApiLinks.Type.GetFuel, this.requestData)
  //   .pipe(
  //     catchError(this.handleErrorObservable)
  //   );
  // }

  // getBmClass(): Observable<ClasaBmAnterioara[]> {
  //   this.getRequestData();
  //   return this.http.post<ClasaBmAnterioara[]>(this.apiLink + ApiLinks.Type.GetBmClass, this.requestData)
  //   .pipe(
  //     catchError(this.handleErrorObservable)
  //   );
  // }

}
