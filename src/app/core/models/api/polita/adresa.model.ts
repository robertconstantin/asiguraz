import { GenericModel } from '../../generic.model';

export class Adresa extends GenericModel {
  judet: string;
  // TODO
  localitateSiruta: string;
  localitate: string;
  
  strada: string;
  numar: string;
  bloc: string;
  scara: string;
  apartament: number;
  codPostal: string;
  adresaString: string;
  
}
