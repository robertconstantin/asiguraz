import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
// services
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { WorkflowService } from 'src/app/core/services/app/workflow.service';
import { PolitaService } from 'src/app/core/services/core/polita.service';
import { JudetService } from 'src/app/core/services/core/judet.service';
import { LocalitateService } from 'src/app/core/services/core/localitate.service';
// models
import { Sofer } from 'src/app/core/models/api/polita/sofer.model';
import { Proprietar, TipuriPersoana } from 'src/app/core/models/api/polita/proprietar.model';
import { Judet } from 'src/app/core/models/api/polita/judet.model';
import { Localitate } from 'src/app/core/models/api/polita/localitate.model';
import { User } from 'src/app/core/models/user/user.model';
import { Adresa } from 'src/app/core/models/api/polita/adresa.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-proprietar',
  templateUrl: './proprietar.component.html',
  styleUrls: ['./proprietar.component.scss']
})
export class ProprietarComponent implements OnInit, OnDestroy {

  public proprietar: Proprietar = new Proprietar();
  public soferPrincipal: Sofer = new Sofer();
  public soferi: Sofer[] = new Array();

  public user: User;
  public tipuriPersoane = TipuriPersoana;
  public tipPersoana = TipuriPersoana.fizica;
  public soferLaFelCuProprietar = true;

  // adresa jud and loc
  public judete: Judet[] = [];
  public localitati: Localitate[] = [];
  public loadingLocalitati: boolean = false;
  public loadingJudete: boolean = false;

  // hacks 
  public dataPermisConducere;
  public dataPermisConducereMax: Date = new Date();

  // form
  public pForm: FormGroup;
  public jsonForm;

  // subscriptions
  private tipPersoanaSubscription: Subscription;

  constructor(private appStorageService: AppStorageService,
    private politaService: PolitaService,
    private judetService: JudetService,
    private localitateService: LocalitateService,
    private formBuilder: FormBuilder,
    private workflowService: WorkflowService
  ) {
  }

  ngOnInit() {
    this.user = this.appStorageService.isUserLoggedIn();
    this.initForm();
    this.initData();
    this.setTypeOfOwner();
  }

  private initForm() {
    if (!this.proprietar.adresa) {
      this.proprietar.adresa = new Adresa();
    }
    // create form
    this.pForm = this.formBuilder.group({
      // date contact
      telefonMobil: ['', (this.user ? [Validators.required, Validators.minLength(10)] : null)],
      email: ['', (this.user ? [Validators.required, Validators.email] : null)],
      // date firma
      societate: [''],
      // date persoana proprietar
      prenume: ['', Validators.required],
      nume: [null, [Validators.required]],
      codDeInregistrare: [null],
      codNumericPersonal: ['', [Validators.required, Validators.minLength(13)]],
      serieCi: ['', Validators.required],
      numarCi: ['', Validators.required],
      dataPermisConducere: ['', Validators.required],
      tipPersoana: TipuriPersoana.fizica,
      termeni: ['', Validators.requiredTrue],
      adresa: this.formBuilder.group({
        adresaString: [''],
        judet: ['', Validators.required],
        localitate: ['', Validators.required],
        strada: ['', Validators.required],
        numar: ['', Validators.required],
        bloc: [''],
        scara: [''],
        apartament: ['']
      })
    });
    this.pForm.valueChanges.subscribe(data => {
      console.log('formChanges=', data);
      this.politaService.saveProprietar(data);
    });
  }

  private initData() {
    const proprietar = this.politaService.getProprietar();
    if (proprietar) {
      this.proprietar = proprietar;
      if (!this.proprietar.adresa) { this.proprietar.adresa = new Adresa(); }
      this.setFormValues(proprietar);
    }
    this.soferPrincipal = this.politaService.getSoferPrincipal();
    this.soferi = this.politaService.getSoferi();
    // adresa judete
    this.getJudete();
  }

  get p() { return this.pForm.controls; }

  get a() { return (this.pForm.controls['adresa'] as FormGroup).controls; }

  private setFormValues(proprietar) {
    if (!proprietar.adresa) { proprietar.adresa = new Adresa(); }
    if (proprietar.tipPersoana) {
      this.tipPersoana = proprietar.tipPersoana;
    } else {
      proprietar.tipPersoana = TipuriPersoana.fizica;
      this.tipPersoana = TipuriPersoana.fizica;
    }
    if (proprietar.adresa.judet) {
      this.getLocalitati(proprietar.adresa.judet);
    }

    this.pForm.patchValue(proprietar);
    console.log('setFormValues = ', this.pForm.value);
  }

  private setUserLoginForm() {
    const telefonMobilControl = this.pForm.get('telefonMobil');
    const emailControl = this.pForm.get('email');
    if (this.user) {
      telefonMobilControl.setValidators(null);
      emailControl.setValidators(null);
    } else {
      telefonMobilControl.setValidators([Validators.required, Validators.minLength(10)]);
      emailControl.setValidators([Validators.required, Validators.email]);
    }
    telefonMobilControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  }

  private setTypeOfOwner() {
    const cuiControl = this.pForm.get('codDeInregistrare');
    const cnpControl = this.pForm.get('codNumericPersonal');
    const societateControl = this.pForm.get('societate');

    this.tipPersoanaSubscription = this.pForm.get('tipPersoana').valueChanges
      .subscribe(tipuri => {
        if (tipuri === TipuriPersoana.fizica) {
          cuiControl.setValidators(null);
          societateControl.setValidators(null);
          cnpControl.setValidators([Validators.required]);
        } else {
          cuiControl.setValidators([Validators.required]);
          societateControl.setValidators([Validators.required]);
          cnpControl.setValidators(null);
        }
        cuiControl.updateValueAndValidity();
        societateControl.updateValueAndValidity();
        cnpControl.updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.politaService.saveProprietar(this.pForm.value);
    this.politaService.saveSoferi(this.soferPrincipal, this.soferi);
    console.log('ngOnDestroy.Saved = ', this.pForm.value);
    if (this.tipPersoanaSubscription) {
      this.tipPersoanaSubscription.unsubscribe();
    }
  }

  /* START Methods Sofer */

  addSofer() {
    const sofer = new Sofer();
    this.soferi.push(sofer);
  }

  removeSofer(index: number) {
    this.soferi.splice(index, 1);
  }

  private checkForms(): boolean {
    var aForm = this.pForm.controls['adresa'] as FormGroup;
    this.setUserLoginForm();
    for (let i in this.pForm.controls) {
      this.pForm.controls[i].markAsTouched();
      this.pForm.controls[i].markAsDirty();
    }
    aForm.markAsDirty();
    aForm.markAsTouched();
    for (let j in aForm.controls) {
      aForm.controls[j].markAsTouched();
      aForm.controls[j].markAsDirty();
    }
    return (aForm.valid && this.pForm.valid);
  }
  /* END Methods Sofer */

  getAddress(address: any) {
    if (address) {
      this.proprietar.adresa.adresaString = address.location;
      this.proprietar.adresa.judet = address.judet;
      this.proprietar.adresa.localitate = address.city;
      this.proprietar.adresa.strada = address.street;
      this.proprietar.adresa.numar = address.streetNr;
      this.proprietar.adresa.codPostal = address.postalCode;
      this.pForm.patchValue({
        adresa: this.proprietar.adresa
      });
    }
  }

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  goToStep(step) {
    if (this.checkForms()) {
      this.workflowService.goToStep(step);
    }
  }

  /* START Adresa Judet and Localitate */

  getJudete() {
    this.loadingJudete = true;
    this.judetService.getAll().then(result => {
      if (result) {
        this.judete = result;
      }
      this.loadingJudete = false;
    })
  }

  getLocalitati(judetCod: string) {
    this.loadingLocalitati = true;
    this.localitateService.getByJudet(judetCod).then(result => {
      if (result) {
        this.localitati = result;
      }
      this.loadingLocalitati = false;
    })

  }

  /* END Adresa Judet and Localitate */
}
