import { Vehicul } from '../polita/vehicul.model';
import { Proprietar } from '../polita/proprietar.model';

export class EmiterePolitaRequest {
  IdentificatorOferta: string;
  DataPlatii: Date;
  OrderID: string;
  vehicul: Vehicul;
  proprietar: Proprietar;
  politaID: number;
}
