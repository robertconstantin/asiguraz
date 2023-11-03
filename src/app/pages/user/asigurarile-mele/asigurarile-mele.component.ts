import { Component, OnInit } from '@angular/core';
import { PolitaRepository } from 'src/app/core/repositories/core/polita.repository';
import { Polita } from 'src/app/core/models/api/polita/polita.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InsuranceRepository } from 'src/app/core/repositories/broker24/insurance.repository';
import { EmiterePolitaRequest } from 'src/app/core/models/api/requests/emitere-polita-request.model';
import { PolitaService } from 'src/app/core/services/core/polita.service';
import * as moment from 'moment';
import { PolitaEmisa } from 'src/app/core/models/api/polita/polita-emisa.model';

@Component({
  selector: 'app-asigurarile-mele',
  templateUrl: './asigurarile-mele.component.html',
  styleUrls: ['./asigurarile-mele.component.scss']
})
export class AsigurarileMeleComponent implements OnInit {

  public loading = false;
  public loadingEmiterePolita = false;
  public polite: Polita[] = new Array();

  public sendPolitaSuccess: boolean = false;
  public sendPolitaLoading: boolean = false;
  public politaEmisaSuccess: boolean = false;

  private orderID: string;
  private userID: string;
  private identificatorOferta: string;

  constructor(
    private politaRepository: PolitaRepository,
    private politaService: PolitaService,
    private insuranceRepository: InsuranceRepository,
    private route: ActivatedRoute,
    private router: Router) {
      this.userID = this.route.snapshot.params.userID;
      this.identificatorOferta = this.route.snapshot.params.identificatorOferta;
      this.orderID = this.route.snapshot.queryParamMap.get('orderId');
      console.log(`params = ${this.userID} / ${this.identificatorOferta} / ${this.orderID}`, );
  }

  ngOnInit() {
    this.getPolite();
  }

  veziOferte(polita: Polita) {
    this.politaService.setPolita(polita);
    this.router.navigate(['/asigurare-rca.html/oferte-asiguratori']);
  }

  finalizareComanda(polita: Polita) {
    this.politaService.setPolita(polita);
    // redirect to finalizare-comanda
    this.router.navigate(['/asigurare-rca.html/finalizare-comanda']);
  }

  adaugaAsigurareNoua() {
    this.politaService.clearPolita();
    this.router.navigate(['/asigurare-rca.html/proprietar']);
  }

  getZileRamase(polita: Polita) {
    const today = moment();
    const endDate = moment(polita.dataInceput).add(polita.durata, 'months');
    const monthDiff = moment(today).diff(moment(endDate), 'months');
    const dayDiff = moment(today.add(-monthDiff, 'months')).diff(moment(endDate), 'days');
    return `${Math.abs(monthDiff)} luni ${ Math.abs(dayDiff)} zile`;
  }

  getValabilitate(polita: Polita) {
    return moment(polita.dataInceput).add(polita.durata, 'months').format('DD MMM YYYY');
  }

  getAsigurarePdf(politaEmisa: PolitaEmisa) {
    window.open(politaEmisa.linkAsigurare, '_blank');
  }

  sendPolita(polita: Polita) {
    this.sendPolitaLoading = true;
    this.insuranceRepository.sendPolita(polita.cotatie.identificatorOferta).then((result) => {
      this.sendPolitaSuccess = true;
      this.sendPolitaLoading = false;
    });
  }

  private emitePolita(polita: Polita) {
    this.loadingEmiterePolita = true;
    const emiterePolitaRequest = new EmiterePolitaRequest();
    emiterePolitaRequest.IdentificatorOferta = this.identificatorOferta;
    emiterePolitaRequest.OrderID = this.orderID;
    emiterePolitaRequest.vehicul = polita.vehicul;
    emiterePolitaRequest.proprietar = polita.proprietar;
    emiterePolitaRequest.politaID = polita.id;
    this.insuranceRepository.issueInsurance(emiterePolitaRequest).then((result) => {
      this.loadingEmiterePolita = false;
      polita.loadingEmitere = false;
      polita.saEmisCuSuccess = true;
      polita.politaEmisa = result;
      polita.statusID = 4;
      this.politaEmisaSuccess = true;
      this.politaService.savePolita(polita).subscribe((resul) => {
        this.politaService.clearPolita();
      });
      console.log('issueInsurance =', result);
    });
  }

  private getPolite() {
    this.loading = true;
    this.politaRepository.getAllByUserIDIncludeObjects('Cotatie,Vehicul,Proprietar,Proprietar.Adresa,Soferi,SoferPrincipal,PolitaEmisa')
    .then((result: Polita[]) => {
      this.polite = result;
      this.loading = false;
      if (this.orderID && this.userID && this.identificatorOferta) {
        this.polite.forEach(polita => {
          if (polita.cotatie.identificatorOferta === this.identificatorOferta) {
            polita.loadingEmitere = true;
            this.emitePolita(polita);
          }
        });
      }
    });
  }

}

