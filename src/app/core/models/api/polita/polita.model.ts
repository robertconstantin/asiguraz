import { Vehicul } from './vehicul.model';
import { Proprietar } from './proprietar.model';
import { GenericModel } from '../../generic.model';
import { Sofer } from './sofer.model';
import { Cotatie } from '../cotatie/cotatie.model';
import { PolitaEmisa } from './polita-emisa.model';

export class Polita extends GenericModel {
  societate: string;
  cotatie: Cotatie;
  vehicul: Vehicul;
  proprietar: Proprietar;
  soferPrincipal: Sofer;
  soferi: Sofer[];
  clasaBmAnterioara: string;
  // plata
  documentPlata: string;
  chitantaSerie: string;
  chitantaNumar: string;
  dataPlatii: string;
  // date polita
  dataInceput: string;
  durata: number;
  statusID: number;
  politaEmisa: PolitaEmisa;

  loadingEmitere: boolean;
  saEmisCuSuccess: boolean;
}

export enum StatusPolita {
  Open = 1, // Vezi Oferte
  SelectedCompany = 2, // Finalizare Comanda
  ProcessingPayment = 3, // Procesare Plata
  SuccessfullPayment = 4, // Finalizat cu success
  FailedPayment = 5 // Reincearca
}
