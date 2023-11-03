import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from '../base/app-storage.service';
import { ApiLinks } from '../../constants/api-links.const';
import { RequestData } from '../../models/api/request-data.model';
import { BaseService } from '../base/base.service';
// models
import { Societate } from '../../models/api/cotatie/societate.model';
import { Cotatie } from '../../models/api/cotatie/cotatie.model';
import { PolitaPdf } from '../../models/api/polita/polita-pdf.model';
import { Polita } from '../../models/api/polita/polita.model';
import { EmiterePolitaRequest } from '../../models/api/requests/emitere-polita-request.model';
import { SocietateLeasing } from 'src/app/core/models/api/cotatie/societate-leasing.model';

@Injectable()
export class InsuranceService extends BaseService {
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
        this.apiLink + ApiLinks.Insurance.GetCompanies,
        this.requestData
      )
      .toPromise()
      .then((response: any) => response.response as Societate[])
      .catch(this.handleError);
  }

  getSocietatiLeasing(): Promise<SocietateLeasing[]> {
    this.getRequestData();
    return this.http
      .post(
        this.apiLink + ApiLinks.Insurance.GetSocietatiDeLeasing,
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
        this.apiLink + ApiLinks.Insurance.GetQuote,
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
        this.apiLink + ApiLinks.Insurance.IssueInsurance,
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
      .post(this.apiLink + ApiLinks.Insurance.GetPdf, this.requestData)
      .toPromise()
      .then((response: any) => response.response as PolitaPdf)
      .catch(this.handleError);
  }
}
