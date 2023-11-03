import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// repositories && services
import { JudetRepository } from 'src/app/core/repositories/core/judet.repository';
import { AppStorageService } from '../base/app-storage.service';

// models
import { Judet } from 'src/app/core/models/api/polita/judet.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JudetService {

  private judetListStorageName = 'judetList' + environment.applicationVersion;

  constructor(
    private appStorageService: AppStorageService,
    private judetRepository: JudetRepository) { }

  getAll(): Promise<Judet[]> {
    var localResult: Judet[] = []
    return new Promise<Judet[]>((resolve, reject) => {
      localResult = this.appStorageService.get(this.judetListStorageName) as Judet[];
      if (localResult && localResult.length > 0) {
        resolve(localResult);
      } else {
        this.judetRepository.getAllAllow().then((response: Judet[]) => {
          if (response && response.length > 0) {
            this.appStorageService.set(this.judetListStorageName, response);
          }
          resolve(response);
        });
      }
    });



  }


}
