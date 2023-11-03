import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
// model
import { Categorie } from '../../../core/models/api/auto/categorie.model';
import { GetMarciRequest } from '../../../core/models/api/requests/get-marci-request.model';
import { Marca } from '../../../core/models/api/auto/marca.model';
import { Model } from '../../../core/models/api/auto/model.model';
import { Vehicul } from '../../../core/models/api/polita/vehicul.model';
import { TipInmatriculare } from '../../../core/models/api/types/tip-inmatriculare.model';
import { Combustibil } from '../../../core/models/api/types/combustibil.model';
import { TipUtilizare } from '../../../core/models/api/types/tip-utilizare.model';
// service
import { TypeService } from '../../../core/services/broker24/type.service';
import { AutoService } from '../../../core/services/broker24/auto.service';
import { PolitaService } from 'src/app/core/services/core/polita.service';
import { WorkflowService } from 'src/app/core/services/app/workflow.service';

@Component({
  selector: 'app-vehicul',
  templateUrl: './vehicul.component.html',
  styleUrls: ['vehicul.component.scss']
})
export class VehiculComponent implements OnInit, OnDestroy {

  public vehicul: Vehicul = new Vehicul();

  // dropdown objects
  public tipuriInmatriculare: TipInmatriculare[] = new Array();
  public loadingTipuriInmatriculare: boolean = true;

  public tipuriUtilizare: TipUtilizare[] = new Array();
  public loadingTipuriUtilizare: boolean = true;

  public combustibili: Combustibil[] = new Array();
  public loadingCombustibili: boolean = true;

  public categorii: Categorie[] = new Array();
  public loadingCategorii: boolean = true;

  public filteredSubcategorii = new Array();
  public subcategorii: Categorie[] = new Array();
  public loadingSubcategorii: boolean = true;

  public marci: Marca[] = new Array();
  public loadingMarci: boolean = false;

  //public modele: Model[] = new Array();

  // form
  public form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public typeService: TypeService,
    public autoService: AutoService,
    private politaService: PolitaService,
    private workflowService: WorkflowService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initData();
    this.getDropDownLists();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      numarInmatriculare: new FormControl('', Validators.required),
      serieSasiu: new FormControl('', Validators.required),
      carteIdentitate: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      subcategorie: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      anFabricatie: new FormControl('', Validators.required),
      capacitateCilindrica: new FormControl('', Validators.required),
      putere: new FormControl('', Validators.required),
      masaMaxima: new FormControl('', Validators.required),
      numarLocuri: new FormControl('', Validators.required),
      tipInmatriculare: new FormControl('', Validators.required),
      combustibil: new FormControl('', Validators.required),
      tipUtilizare: new FormControl('', Validators.required),
    });
    // subscribe to form changes
    this.form.valueChanges.subscribe(data => {
      console.log('formChanges=', data);
      this.vehicul = data as Vehicul;
      this.politaService.saveVehicul(this.vehicul);
    });
  }

  private initData() {
    this.vehicul = this.politaService.getVehicul();
    if (this.vehicul) {
      this.form.patchValue(this.vehicul);
    }
  }

  private getDropDownLists() {
    this.typeService.getRegisterType().then((result: TipInmatriculare[]) => {
      this.tipuriInmatriculare = result;
      this.loadingTipuriInmatriculare = false;
    });
    this.typeService.getUsageType().then((result: TipUtilizare[]) => {
      this.tipuriUtilizare = result;
      this.loadingTipuriUtilizare = false;
    });
    this.typeService.getFuel().then((result: Combustibil[]) => {
      this.combustibili = result;
      this.loadingCombustibili = false;
    });
    this.autoService.getCategories().then((result: Categorie[]) => {
      this.categorii = result;
      this.loadingCategorii = false;
    });
    this.autoService.getSubcategories('all').then((result: Categorie[]) => {
      this.subcategorii = result;
      this.loadingSubcategorii = false;
      this.initSubcategoriesMake();
    });
  }

  private initSubcategoriesMake() {
    this.vehicul = this.politaService.getVehicul();
    if (this.vehicul) {
      this.filterSubcategories();
      if (this.vehicul.subcategorie && this.vehicul.categorie) {
        this.form.patchValue(this.vehicul);
      }
      this.getBrands();
      if (this.vehicul.subcategorie && this.vehicul.categorie && this.vehicul.marca) {
        this.form.patchValue(this.vehicul);
      }
    }
  }

  /**
   * START Sub Dropdown Methods
   */
  public filterSubcategories() {
    // this.form.get('subcategorie').setValue('');
    // this.form.get('marca').setValue('');
    this.loadingSubcategorii = true;
    const categorie = this.form.get('categorie') ? this.form.get('categorie').value : '';
    const categorieObj = this.categorii.find(e => e.Broker24ID.toString() === categorie.toString());
    if (categorie && categorieObj) {
      this.filteredSubcategorii = this.subcategorii.filter(
        e => e.CategorieID.toString() === categorieObj.Broker24ID.toString()
      );
    }

    this.loadingSubcategorii = false;
  }

  public getBrands() {
    const categorie = this.form.get('categorie') ? this.form.get('categorie').value : '';
    const subcategorie = this.form.get('subcategorie') ? this.form.get('subcategorie').value : '';
    const tipInmatriculare = this.form.get('tipInmatriculare') ? this.form.get('tipInmatriculare').value : '';

    if (categorie && subcategorie && tipInmatriculare) {
      this.loadingMarci = true;
      const request = new GetMarciRequest();
      request.Categorie = categorie;
      request.Subcategorie = subcategorie;
      request.TipInmatriculare = tipInmatriculare;
      this.autoService.getBrands(request).then((result: Marca[]) => {
        this.marci = result;
        this.loadingMarci = false;
      });
    }
  }

  // public getModels() {
  //   const marca = this.form.get('marca') ? this.form.get('marca').value : '';
  //   const marcaObj = this.marci.find(e => e.Nume === marca);
  //   if (marca && marcaObj) {
  //     this.autoService.getModels(marcaObj.Broker24ID).then((result: Model[]) => {
  //       this.modele = result;
  //     });
  //   }
  // }

  /**
   * END Sub Dropdown Methods
   */

  goToStep(step) {
    if (step == 'proprietar') {
      this.workflowService.goToStep(step);
    } else if (this.checkForms()) {
      this.workflowService.goToStep(step);
    }
  }

  private checkForms(): boolean {
    this.form.markAsTouched();
    this.form.markAsDirty();
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].markAsDirty();
    }
    return (this.form.valid);
  }

  ngOnDestroy() {
    this.politaService.saveVehicul(this.vehicul);
  }

  //get v() { return this.form.controls; }

}
