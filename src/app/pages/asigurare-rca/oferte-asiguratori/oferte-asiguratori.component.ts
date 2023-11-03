import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { InsuranceService } from '../../../core/services/broker24/insurance.service';
import { Polita, StatusPolita } from '../../../core/models/api/polita/polita.model';
import { Cotatie } from '../../../core/models/api/cotatie/cotatie.model';
import { Societate } from '../../../core/models/api/cotatie/societate.model';

import * as moment from 'moment';
import { PolitaService } from 'src/app/core/services/core/polita.service';
import { WorkflowService } from 'src/app/core/services/app/workflow.service';
import { SocietateAsigurareService } from 'src/app/core/services/broker24/societate-asigurare.service';

@Component({
  selector: 'app-oferte-asiguratori',
  templateUrl: './oferte-asiguratori.component.html',
  styleUrls: ['oferte-asiguratori.component.scss']
})
export class OferteAsiguratoriComponent implements OnInit, OnDestroy {

  public loadingOferte = false;
  public path: string[] = ['cotatie', 'Prima'];
  public polita: Polita = new Polita();
  public societati: Societate[] = new Array();
  public societatiFiltrate: Societate[] = new Array();
  public valabilPanaInData: string;

  public theMinDate: Date;
  public theMaxDate: Date;
  // form
  public form: FormGroup;

  constructor(
    private router: Router,
    private insuranceService: InsuranceService,
    private societateAsigurareService: SocietateAsigurareService,
    private politaService: PolitaService,
    private formBuilder: FormBuilder,
    private workflowService: WorkflowService
  ) {

  }

  ngOnInit() {
    this.initForm();
    this.initData();
    this.theMinDate = new Date(moment().add(1, 'days').format('yyyy-MM-DD'));
    this.theMaxDate = new Date(moment().add(1, 'months').format('yyyy-MM-DD'));
  }

  private initForm() {
    this.form = this.formBuilder.group({
      dataInceput: ['', [Validators.required]],
      durata: ['', [Validators.required]],
    });
    this.getValabilitate();
    // subscribe to form changes
    this.form.valueChanges.subscribe(data => {
      this.polita.dataInceput = data.dataInceput;
      this.polita.durata = data.durata;
      this.getValabilitate();
      this.politaService.savePolita(this.polita).subscribe();
    });
  }

  private initData() {
    this.societateAsigurareService.getSocietatiAsigurare().subscribe((result) => {
      this.societati = result;
    });
    this.polita = this.politaService.getPolita();
    const d = new Date();
    var isDataInceput = this.polita.dataInceput && new Date(this.polita.dataInceput) > d;
    console.log('isDataInceput', isDataInceput, this.polita.dataInceput);

    this.polita.dataInceput = isDataInceput ? this.polita.dataInceput :
      `${d.getFullYear()}-${(d.getMonth() + 1)}-${(d.getDate() + 1)}`;
    this.polita.durata = this.polita.durata ? this.polita.durata : 6;
    this.form.patchValue({ dataInceput: moment(this.polita.dataInceput).format('yyyy-MM-DD'), durata: this.polita.durata });
    this.genereazaOferte();
  }

  private genereazaOferte() {
    this.societatiFiltrate = [];
    this.loadingOferte = true;
    // change polita status
    this.polita.statusID = StatusPolita.Open;
    this.politaService.savePolita(this.polita).subscribe((result) => { this.polita = result; });
    // get cotatie for each societate
    var i = 0;
    this.societati.forEach((item: Societate) => {
      this.polita.societate = item.Nume;
      item.isLoading = true;
      this.insuranceService.getQuote(this.polita).then((result: Cotatie) => {
        if (result) {
          item.cotatie = result;
          console.log(`cotatie ${this.polita.societate}=`, result.mesaj);
          this.insertOferta(item);
        } else {
          console.log(`eroare ${item.Nume}=`, result.mesaj);
          item.cotatie = new Cotatie();
          item.cotatie.eroare = true;
        }
        item.isLoading = false;
        i++;
        if (i == this.societati.length)
          this.loadingOferte = false;
      });

    });
  }

  private insertOferta(societate: Societate) {
    this.societatiFiltrate.push(societate);
    this.societatiFiltrate = this.societatiFiltrate.sort((a, b) => Number(a.cotatie.prima) - Number(b.cotatie.prima));
  }

  ngOnDestroy() {
    if (this.societati) {
      this.societateAsigurareService.saveSocietatiAsigurare(this.societati);
    }
  }

  onDurataChange() {
    this.genereazaOferte();
  }

  getValabilitate() {
    this.valabilPanaInData = moment(this.polita.dataInceput).add(this.polita.durata, 'months').format('DD MMM YYYY');
  }

  finalizareComanda(cotatie: Cotatie, societate: string) {
    // change polita status
    this.polita.societate = societate;
    this.polita.statusID = StatusPolita.SelectedCompany;
    this.polita.cotatie = cotatie;
    this.politaService.savePolita(this.polita).subscribe((result) => { 
      this.polita = result; 
      this.router.navigate(['/asigurare-rca.html/finalizare-comanda']);
    });
    
  }

  goToStep(step: string) {
    this.workflowService.goToStep(step);
  }

}
