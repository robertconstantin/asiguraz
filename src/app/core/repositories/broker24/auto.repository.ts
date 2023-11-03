import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// services
import { AppStorageService } from '../../services/base/app-storage.service';
// models
import { RequestData } from '../../models/api/request-data.model';
import { Categorie } from 'src/app/core/models/api/auto/categorie.model';
import { ApiLinks } from 'src/app/core/constants/api-links.const';
import { Marca } from 'src/app/core/models/api/auto/marca.model';
import { BaseRepository } from '../base.repository';
import { GetMarciRequest } from 'src/app/core/models/api/requests/get-marci-request.model';
import { Model } from 'src/app/core/models/api/auto/model.model';

@Injectable()
export class AutoRepository extends BaseRepository  {

  constructor(private http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(appStorageService, requestData);
  }

  getCategories(): Promise<Categorie[]> {
    this.getRequestData();
    return this.http.post(this.userApiLink + ApiLinks.Auto.GetCategories, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Categorie[])
      .catch(this.handleError);
  }

  getSubcategories(categorie: string): Promise<Categorie[]> {
    this.getRequestData();
    this.requestData.data = { id: categorie};
    return this.http.post(this.userApiLink + ApiLinks.Auto.GetSubcategories, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Categorie[])
      .catch(this.handleError);
  }

  getBrands(data: GetMarciRequest): Promise<Marca[]> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.userApiLink + ApiLinks.Auto.GetBrands, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Marca[])
      .catch(this.handleError);
  }

  getModels(marcaID: any): Promise<Model[]> {
    this.getRequestData();
    this.requestData.data = {id: marcaID};
    return this.http.post(this.userApiLink + ApiLinks.Auto.GetModels, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Model[])
      .catch(this.handleError);
  }

}
