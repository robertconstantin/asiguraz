import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// service
import { AppStorageService } from '../../services/base/app-storage.service';
import { GenericRepository } from '../generic.repository';
// models
import { Vehicul } from 'src/app/core/models/api/polita/vehicul.model';
import { RequestData } from '../../models/api/request-data.model';

@Injectable()
export class VehiculRepository extends GenericRepository<Vehicul> {

  constructor(http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(http, appStorageService, requestData, { link: 'api/vehicul/' });
  }

}
