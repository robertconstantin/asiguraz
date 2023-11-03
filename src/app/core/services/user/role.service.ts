import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { AppStorageService } from '../base/app-storage.service';

import { ApiLinks } from '../../constants/api-links.const';

import { AppSession } from '../../models/user/app-session.model';
import { RequestData } from '../../models/api/request-data.model';

import { Role } from '../../models/user/role.model';
import { BaseService } from '../base/base.service';

@Injectable()
export class RoleService extends BaseService {

  constructor(private http: HttpClient, appStorageService: AppStorageService, requestData: RequestData) {
    super(appStorageService, requestData);
  }

  addOne(data: Role): Promise<Role> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.apiLink + ApiLinks.Role.AddOne, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Role)
      .catch(this.handleError);
  }

  getOneById(data: number): Promise<Role> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.GetOneById, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Role)
      .catch(this.handleError);
  }

  getList(): Promise<Role[]> {
    this.getRequestData();
    this.requestData.data = null;
    return this.http.post(this.apiLink + ApiLinks.Role.GetList, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Role[])
      .catch(this.handleError);
  }

  update(data: Role): Promise<Role> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.apiLink + ApiLinks.Role.Update, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Role)
      .catch(this.handleError);
  }

  merge(data: Role): Promise<Role> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.apiLink + ApiLinks.Role.Merge, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Role)
      .catch(this.handleError);
  }

  toggleActive(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.ToggleActive, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }

  addList(data: Role): Promise<Role> {
    this.getRequestData();
    this.requestData.data = data;
    return this.http.post(this.apiLink + ApiLinks.Role.AddList, this.requestData)
      .toPromise()
      .then((response: any) => response.response as Role)
      .catch(this.handleError);
  }

  delete(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.Delete, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }

  toggleRoleCanCar(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.ToggleRoleCanCar, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }
  toggleRoleCanDriver(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.ToggleRoleCanDriver, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }
  toggleRoleCanCarInsurance(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.ToggleRoleCanCarInsurance, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }
  toggleRoleCanCarVignette(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.ToggleRoleCanCarVignette, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }
  toggleRoleCanUsers(data: number): Promise<boolean> {
    this.getRequestData();
    this.requestData.data = {role_id: data };
    return this.http.post(this.apiLink + ApiLinks.Role.ToggleRoleCanUsers, this.requestData)
      .toPromise()
      .then((response: any) => response.response as boolean)
      .catch(this.handleError);
  }

}
