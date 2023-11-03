import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// services
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { GenericRepository } from '../generic.repository';
// models
import { Proprietar } from 'src/app/core/models/api/polita/proprietar.model';
import { RequestData } from 'src/app/core/models/api/request-data.model';

@Injectable()
export class ProprietarRepository extends GenericRepository<Proprietar>  {

  constructor(http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(http, appStorageService, requestData, { link: 'api/sofer/' });
  }

}
