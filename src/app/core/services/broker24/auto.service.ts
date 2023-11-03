import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppStorageService } from '../base/app-storage.service';
import { ApiLinks } from '../../constants/api-links.const';
import { RequestData } from '../../models/api/request-data.model';
import { BaseService } from '../base/base.service';
// models
import { Categorie } from '../../models/api/auto/categorie.model';
import { Marca } from '../../models/api/auto/marca.model';
import { Model } from '../../models/api/auto/model.model';
import { GetMarciRequest } from '../../models/api/requests/get-marci-request.model';
import { environment } from 'src/environments/environment';
import { AutoRepository } from 'src/app/core/repositories/broker24/auto.repository';

@Injectable()
export class AutoService extends BaseService {

  constructor(private autoRepository: AutoRepository, appStorageService: AppStorageService, requestData: RequestData) {
    super(appStorageService, requestData);
  }

  getCategories(): Promise<Categorie[]> {
    const objectName = 'categorii' + environment.applicationVersion;
    return new Promise((resolve, error) => {
      // const localResult = this.appStorageService.get(objectName) as Categorie[];
      // if (localResult) {
      //    resolve(localResult);
      // } else {
      this.autoRepository.getCategories().then((result: Categorie[]) => {
        this.appStorageService.set(objectName, result);
        resolve(result);
      });
      // }
    });
  }

  getSubcategories(categorie: string): Promise<Categorie[]> {
    const objectName = 'subcategorii' + environment.applicationVersion;
    return new Promise((resolve, error) => {
      //  const localResult = this.appStorageService.get(objectName) as Categorie[];
      //  if (localResult) {
      //     resolve(localResult);
      //  } else {
      this.autoRepository.getSubcategories(categorie).then((result: Categorie[]) => {
        this.appStorageService.set(objectName, result);
        resolve(result);
      });
      // }
    });
  }

  getBrands(data: GetMarciRequest): Promise<Marca[]> {
    const objectName = 'marci' + environment.applicationVersion;
    return new Promise((resolve, error) => {
      // const localResult = this.appStorageService.get(objectName) as Marca[];
      // if (localResult) {
      //   resolve(localResult);
      // } else {
      this.autoRepository.getBrands(data).then((result: Marca[]) => {
        this.appStorageService.set(objectName, result);
        resolve(result);
      });
      //}
    });
  }

  getModels(marcaID: any): Promise<Model[]> {
    const objectName = 'modele' + environment.applicationVersion;
    return new Promise((resolve, error) => {
      //  const localResult = this.appStorageService.get(objectName) as Model[];
      //  if (localResult) {
      //     resolve(localResult);
      //  } else {
      this.autoRepository.getModels(marcaID).then((result: Model[]) => {
        this.appStorageService.set(objectName, result);
        resolve(result);
      });
      // }
    });
  }

}
