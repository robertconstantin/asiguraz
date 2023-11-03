import { GenericModel } from '../../generic.model';

export class Vehicul extends GenericModel {
  numarInmatriculare: string;
  // NOTDB [static Field]
  tipInmatriculare: string;
  serieSasiu: string;
  // Categoria masinii - valorile posibile se iau din metoda get_categorii
  categorie: string;
  // Subcategoria auto - valorile posibile se iau din metoda get_subcategorii
  subcategorie: string;
  marca: string;
  model: string;
  //  ID de model, obtinut in urma apelarii metodei get_modele.Acest tag este
  //  obligatoriu daca se doreste obtinerea cotatiei la Generali pentru Autoturisme si Autoutilitare
  //  sub 7.5t.Pentru alte variante nu este obligatoriu. Daca nu exista o valoare pentru acest tag,
  //  se poate trimite null sau se poate omite din cerere
  modelID: string;
  anFabricatie: number;
  capacitateCilindrica: number;
  putere: string;
  masaMaxima: number;
  numarLocuri: number;
  // NOTDB [static Field]
  // obligatoriu daca se face o cotatie pe Generali pentru Autoturisme/Autoutilitare sub 7.5t.
  combustibil: string;
  // NOTDB [static Field]
  tipUtilizare: string;
  // Seria si numarul cartii de identitate a vehiculului
  carteIdentitate: string;
}
