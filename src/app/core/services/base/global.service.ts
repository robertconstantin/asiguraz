import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cotatie } from '../../models/api/cotatie/cotatie.model';

@Injectable()
export class GlobalService {

  private cotatiaSelectata: Subject<Cotatie>;

  constructor() {
    this.cotatiaSelectata = new Subject();
  }

  private setCotatie(cotatie: Cotatie) {
    console.log('global ready =', cotatie);
    this.cotatiaSelectata.next(cotatie);
  }
}
