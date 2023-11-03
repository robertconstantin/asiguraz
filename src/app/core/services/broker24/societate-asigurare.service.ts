import { Injectable } from '@angular/core';
// repositories && services
import { AppStorageService } from '../base/app-storage.service';
// models
import { environment } from 'src/environments/environment';
import { Societate } from 'src/app/core/models/api/cotatie/societate.model';
import { InsuranceRepository } from 'src/app/core/repositories/broker24/insurance.repository';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SocietateAsigurareService {

  private societatiLocalStorageName = 'societati' + environment.applicationVersion;

  constructor(
    private appStorageService: AppStorageService,
    private insuranceRepository: InsuranceRepository) {
  }

  getSocietatiAsigurare(): Observable<Societate[]> {
    let societati = this.appStorageService.get(this.societatiLocalStorageName) as Societate[];
    if (societati && societati.length) {
      societati = societati.filter(e => e.Nume !== 'astra' &&  e.Nume !== 'carpatica');
      console.log('local societati =', societati);
      return of(societati);
    } else {
      return this.insuranceRepository.getCompaniesObs().pipe(
        map((result: Societate[]) => {
          societati = result.filter(e => e.Nume !== 'astra' &&  e.Nume !== 'carpatica');
          this.appStorageService.set(this.societatiLocalStorageName, result);
          console.log('db societati =', societati);
          return societati;
        }));
    }
  }

  saveSocietatiAsigurare(societati: Societate[]) {
    this.appStorageService.set(this.societatiLocalStorageName, societati);
  }

  clearSocietati() {
    this.appStorageService.set(this.societatiLocalStorageName, null);
    this.getSocietatiAsigurare();
  }

}
