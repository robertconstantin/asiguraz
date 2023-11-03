import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// model
import { MobilPayResponse } from 'src/app/core/models/api/payments/mobil-pay-response.model';
import { PaymentService } from 'src/app/core/services/user/payment.service';
import { PolitaService } from 'src/app/core/services/core/polita.service';
import { Polita, StatusPolita } from 'src/app/core/models/api/polita/polita.model';
import { environment } from 'src/environments/environment';
// service

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.scss']
})
export class OrderSubmitComponent implements OnInit, OnDestroy {

  public polita: Polita;
  public loadingPayment: boolean = false;

  @ViewChild('postForm') vPostForm;
  data: string;
  envKey: string;

  constructor(
    private paymentService: PaymentService,
    private politaService: PolitaService) {
      this.polita = this.politaService.getPolita();
  }

  ngOnInit() {
  }

  requestPayment() {
    this.loadingPayment = true;
    // change polita status
    this.polita.statusID = StatusPolita.ProcessingPayment;
    this.politaService.savePolita(this.polita).subscribe((result) => { this.polita = result; });
    // console.log('IdentificatorOferta not null please = ', this.polita.cotatie.identificatorOferta);
    // this.polita.cotatie.identificatorOferta = '69892';
    console.log('requestPayment=', this.polita);
    if (this.polita.cotatie && this.polita.cotatie.identificatorOferta && this.polita.cotatie.prima) {
      this.paymentService.mobilPay(this.polita.cotatie).then((result: MobilPayResponse) => {
        this.politaService.clearPolita();
        this.submitMobilPayForm(result.Data, result.Key);
      });
    }
  }

  private submitMobilPayForm(data: string, key: string) {
    this.vPostForm.nativeElement.action = environment.mobilPayLink;
    // this.vPostForm.nativeElement.target = '_blank';
    this.vPostForm.nativeElement.method = 'POST';
    this.data = data;
    this.envKey = key;
    setTimeout(() => {
      this.vPostForm.nativeElement.submit();
    }, 100);
    this.loadingPayment = false;
  }

  ngOnDestroy() {
  }

}
