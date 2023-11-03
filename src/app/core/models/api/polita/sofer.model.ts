import { GenericModel } from '../../generic.model';

export class Sofer extends GenericModel {
  cnp: string;
  nume: string;
  prenume: string;
  ciSeria: string;
  ciNumar: number;
  telefon: string;
  iiPrincipal: boolean;
}
