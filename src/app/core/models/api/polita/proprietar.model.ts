import { Adresa } from './adresa.model';
import { GenericModel } from '../../generic.model';

export class Proprietar extends GenericModel {
  tipPersoana: TipuriPersoana;
  codUnic: string;
  codNumericPersonal: string;
  codDeInregistrare: string;
  nume: string;
  prenume: string;
  societate: string;
  adresa: Adresa;
  telefonMobil: string;
  email: string;
  dataPermisConducere: string;
  pensionar: boolean;
  handicapat: boolean;
  bugetar: boolean;
  numarDaune: string;
  domeniuActivitate: number;
  societateDeLeasing: boolean;
  expusPolitic: boolean;
  rezident: boolean;
  serieCi: string;
  numarCi: string;
  categoriePj: string;
  soferLaFelCuProprietar: boolean = true;
}

// {
//   // ------------------ NODB ------------------ [static Field] fizica, juridica
//   tipPersoana: string;
//   // CUI sau CNP, in functie de tipul persoanei (juridica, fizica)
//   codUnic: string;
//   // (persoane fizice)
//   nume: string;
//   // (persoane fizice)
//   prenume: string;
//   // Numele societatii (persoane juridice)
//   societate: string;
//   adresa: Adresa;
//   telefonMobil: string;
//   email: string;
//   // data_permis_conducere Format aaaa-ll-zz (persoane fizice)
//   dataPermisConducere: string;
//   pensionar: boolean;
//   handicapat: boolean;
//   bugetar: boolean;
//   // numar_daune Numarul de daune
//   numarDaune: string;
//   // Domeniul de activitate, cu valori din metoda get_coduri_caen
//   domeniuActivitate: number;
//   // societate_de_leasing Boolean. Daca persoana juridica este si societate de leasing
//   societateDeLeasing: boolean;
//   // expus_politic Boolean.Poersoana expusa politic (Implicit Nu)
//   expusPolitic: boolean;
//   // rezident Boolean.Rezident in Romania (Implicit Da)
//   rezident: boolean;
//   // serie_ci Seria Carte de Identitate (persoane fizice)
//   serieCi: string;
//   // numar_ci Numar Carte de Identitate (persoane fizice
//   numarCi: string;

//   // Categoria de PJ, necesar doar pentru persoane juridice. Momentan
//   // este folosit doar de Uniqa.In caz ca societate_de_leasing e true, se selecteaza automat
//   // “intermediari financiari - leasing”, indiferent de valoarea trecuta aici.Valori posibile:
//   // SC nefinanciare - S.A.
//   // SC nefinanciare - S.R.L.
//   // SC nefinanciare - P.F.A.
//   // SC nefinanciare - P.F.I.
//   // alte SC nefinanciare
//   // banci si cooperative de credit
//   // intermediari financiari - leasing
//   // alti intermediari financiari
//   // institutii guvernamentale
//   // regii autonome
//   categoriePj: string;
// }

export enum TipuriPersoana {
  fizica = 'fizica',
  juridica = 'juridica',
  leasing = 'leasing'
}
