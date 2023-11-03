import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from '../../services/base/app-storage.service';
import { ApiLinks } from '../../constants/api-links.const';
import { RequestData } from '../../models/api/request-data.model';
import { BaseRepository } from '../base.repository';
// models
import { Societate } from '../../models/api/cotatie/societate.model';
import { Cotatie } from '../../models/api/cotatie/cotatie.model';
import { PolitaPdf } from '../../models/api/polita/polita-pdf.model';
import { Polita } from '../../models/api/polita/polita.model';
import { EmiterePolitaRequest } from '../../models/api/requests/emitere-polita-request.model';
import { SocietateLeasing } from 'src/app/core/models/api/cotatie/societate-leasing.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InsuranceRepository extends BaseRepository {
  constructor(
    private http: HttpClient,
    appStorageService: AppStorageService,
    requestData: RequestData
  ) {
    super(appStorageService, requestData);
  }

  getCompanies(): Promise<Societate[]> {
    this.getRequestData();
    return this.http
      .post(
        this.userApiLink + ApiLinks.Insurance.GetCompanies,
        this.requestData
      )
      .toPromise()
      .then((response: any) => response.response as Societate[])
      .catch(this.handleError);
  }

  getCompaniesObs(): Observable<Societate[]> {
    this.getRequestData();
    return this.http
      .post(
        this.userApiLink + ApiLinks.Insurance.GetCompanies,
        this.requestData
      ).pipe(
        map((response: any) => response.response as Societate[])
      );
  }

  getSocietatiLeasing(): Promise<SocietateLeasing[]> {
    this.getRequestData();
    return this.http
      .post(
        this.userApiLink + ApiLinks.Insurance.GetSocietatiDeLeasing,
        this.requestData
      )
      .toPromise()
      .then((response: any) => response.response as SocietateLeasing[])
      .catch(this.handleError);
  }

  getQuote(data: Polita): Promise<Cotatie> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http
      .post(
        this.userApiLink + ApiLinks.Insurance.GetQuote,
        this.requestData
      )
      .toPromise()
      .then((response: any) => response.response as Cotatie)
      .catch(this.handleError);
  }

  issueInsurance(data: EmiterePolitaRequest): Promise<any> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http
      .post(
        this.userApiLink + ApiLinks.Insurance.IssueInsurance,
        this.requestData
      )
      .toPromise()
      .then((response: any) => response.response as any)
      .catch(this.handleError);
  }

  sendPolita(data: string): Promise<any> {
    this.getRequestData();
    this.requestData.data = { IdentificatorOferta : data };
    return this.http
      .post(
        this.userApiLink + ApiLinks.Insurance.SendPolita,
        this.requestData
      )
      .toPromise()
      .then((response: any) => response.response as any)
      .catch(this.handleError);
  }

  getPdf(data: Cotatie): Promise<PolitaPdf> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http
      .post(this.userApiLink + ApiLinks.Insurance.GetPdf, this.requestData)
      .toPromise()
      .then((response: any) => response.response as PolitaPdf)
      .catch(this.handleError);
  }
}
