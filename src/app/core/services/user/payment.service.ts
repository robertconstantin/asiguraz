import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from '../base/app-storage.service';
import { ApiLinks } from '../../constants/api-links.const';
import { RequestData } from '../../models/api/request-data.model';
import { BaseService } from '../base/base.service';
// models
import { MobilPayResponse } from '../../models/api/payments/mobil-pay-response.model';

@Injectable()
export class PaymentService extends BaseService {

  constructor(private http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(appStorageService, requestData);
   }

   mobilPay(data: any): Promise<MobilPayResponse> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.apiLink + ApiLinks.Payment.MobilPay, this.requestData)
      .toPromise()
      .then((response: any) => response.response as MobilPayResponse)
      .catch(this.handleError);
  }

}
