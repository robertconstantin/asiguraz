import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// repositories && services
import { LocalitateRepository } from 'src/app/core/repositories/core/localitate.repository';
import { AppStorageService } from '../base/app-storage.service';

// models
import { Localitate } from 'src/app/core/models/api/polita/localitate.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalitateService {

  private localitateListStorageName = 'localitateList' + environment.applicationVersion;

  constructor(
    private appStorageService: AppStorageService,
    private localitateRepository: LocalitateRepository) { }

  getByJudet(judetCod: string): Promise<Localitate[]> {
    var localResult: Localitate[] = []
    localResult = this.appStorageService.get(this.localitateListStorageName) as Localitate[];
    if (localResult && localResult.length > 0 && localResult[0].codJudet.toString() === judetCod) {
      var result = new Promise<Localitate[]>((resolve, reject) => {
        resolve(localResult);
      });
      return result;
    } else {
      return this.localitateRepository.getByJudet(judetCod).then((response: Localitate[]) => {
        if (response && response.length > 0) {
          /* TO DO - remove duplicate */
          response.sort((a, b) => a.nume.localeCompare(b.nume));
          this.appStorageService.set(this.localitateListStorageName, response);
        }
        return response;
      });
    }
  }


}
