import { Injectable } from '@angular/core';
// repositories && services
import { PolitaRepository } from 'src/app/core/repositories/core/polita.repository';
import { AppStorageService } from '../base/app-storage.service';
// models
import { Polita } from 'src/app/core/models/api/polita/polita.model';
import { environment } from 'src/environments/environment';
import { Sofer } from 'src/app/core/models/api/polita/sofer.model';
import { Proprietar } from 'src/app/core/models/api/polita/proprietar.model';
import { Adresa } from 'src/app/core/models/api/polita/adresa.model';
import { Vehicul } from 'src/app/core/models/api/polita/vehicul.model';
import { Cotatie } from 'src/app/core/models/api/cotatie/cotatie.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocietateAsigurareService } from '../broker24/societate-asigurare.service';

@Injectable()
export class PolitaService {

  private politaLocalStorageName = 'polita' + environment.applicationVersion;

  constructor(
    private appStorageService: AppStorageService,
    private societateAsigurareService: SocietateAsigurareService,
    private politaRepository: PolitaRepository) { }

  getProprietar(): Proprietar {
    const polita = this.getPolita();
    return polita.proprietar;
  }

  getSoferPrincipal(): Sofer  {
    const polita = this.getPolita();
    return polita.soferPrincipal;
  }

  getSoferi(): Sofer[]  {
    const polita = this.getPolita();
    return polita.soferi;
  }

  getVehicul(): Vehicul {
    const polita = this.getPolita();
    return polita.vehicul;
  }

  getCotatie(): Cotatie {
    const polita = this.getPolita();
    return polita.cotatie;
  }

  getPolita(): Polita {
    let polita = new Polita();
    polita = this.appStorageService.get(this.politaLocalStorageName) as Polita;

    if (!polita) {
      polita = new Polita();
    }
    if (!polita.soferi) {
      polita.soferi = new Array();
    }
    // TODO hack here
    if (!polita.proprietar) {
      polita.proprietar = new Proprietar();
    }
    if (!polita.proprietar.adresa) {
      polita.proprietar.adresa = new Adresa();
    }
    if (!polita.vehicul) {
      polita.vehicul = new Vehicul();
    }
    if (!polita.cotatie) {
      polita.cotatie = new Cotatie();
    }

    // TODO hack
    polita.clasaBmAnterioara = 'B0';
    return polita;
  }

  savePolita(polita: Polita): Observable<Polita> {
    if (polita.id) {
      return this.politaRepository.updateObs(polita).pipe(
        map((result: Polita) => {
          console.log('DBupdated = ', result);
          this.setPolita(result);
          return result;
        }));
    } else {
      return this.politaRepository.createObs(polita).pipe(
        map((result: Polita) => {
          console.log('DBcreated = ', result);
          this.setPolita(result);
          return result;
      }));
    }
  }

  setPolita(polita: Polita) {
    //console.log('localSave = ', polita);
    this.appStorageService.set(this.politaLocalStorageName, polita);
  }

  saveVehicul(vehicul: Vehicul) {
    const polita = this.getPolita();
    polita.vehicul = vehicul;
    this.setPolita(polita);
  }

  saveProprietar(proprietar: Proprietar) {
    const polita = this.getPolita();
    polita.proprietar = proprietar;
    this.setPolita(polita);
  }

  saveSoferi(soferPrincipal: Sofer, soferi: Sofer[]) {
    const polita = this.getPolita();
    polita.soferPrincipal = soferPrincipal;
    polita.soferi = soferi;
    this.setPolita(polita);
  }

  saveCotatie(cotatie: Cotatie) {
    const polita = this.getPolita();
    polita.cotatie = cotatie;
    this.setPolita(polita);
  }

  clearPolita() {
    this.appStorageService.set(this.politaLocalStorageName, null);
    this.societateAsigurareService.clearSocietati();
  }
}
