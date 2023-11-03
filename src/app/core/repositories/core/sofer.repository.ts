import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// services
import { AppStorageService } from '../../services/base/app-storage.service';
import { GenericRepository } from '../generic.repository';
// models
import { RequestData } from '../../models/api/request-data.model';
import { Sofer } from 'src/app/core/models/api/polita/sofer.model';

@Injectable()
export class SoferRepository extends GenericRepository<Sofer>  {

  constructor(http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(http, appStorageService, requestData, { link: 'api/sofer/' });
  }

}
