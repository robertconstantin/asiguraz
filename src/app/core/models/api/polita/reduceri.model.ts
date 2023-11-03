export class Reduceri {
  //  reducere_tehnica Reducere tehnica(%)
  ReducereTehnica: boolean;
  //  are_alta_polita Are alta polita in vigoare(doar la Generali)
  AreAltaPolita: boolean;
  //  are_alta_polita_tip Tipul celeilalte polite(doar la Generali, camp special, este de tip
  //  string si tine cont de el doar daca se trimite ‘IMM’)
  AreAltaPolitaTip: boolean;
  //  are_copil_minor Daca asiguratul are copil minor in intretinere
  AreCopilMinor: boolean;
  //  are_polita_casco Daca asiguratul are polita CASCO valabila
  AreaPolitaCasco: boolean;
  //  plata_integrala Plata se face in integral
  PlataIntegrala: boolean;
  //  ani_fara_dauna Numarul de ani fara dauna
  AniFaraDauna: number;
  //  parc_auto Marime parc auto
  ParcAuto: string;
  //  zona_rurala Daca asiguratul locuieste in zona rurala
  ZonaRurala: boolean;
}
