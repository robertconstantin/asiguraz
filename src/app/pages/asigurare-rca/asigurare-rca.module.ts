import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
// modules
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedModule } from '../shared/shared.module';
import { AsigurareRcaRoutingModule } from './asigurare-rca-routing.module';
// components
import { ProprietarComponent } from './proprietar/proprietar.component';
import { VehiculComponent } from './vehicul/vehicul.component';
import { OferteAsiguratoriComponent } from './oferte-asiguratori/oferte-asiguratori.component';
import { SoferComponent } from './sofer/sofer.component';
import { InfoProprietarComponent } from './proprietar/info-proprietar/info-proprietar.component';
import { InfoVehiculComponent } from './vehicul/info-vehicul/info-vehicul.component';
import { OrderSubmitComponent } from './order-submit/order-submit.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { AddressComponent } from './proprietar/address/address.component';
import { OrderByPipe } from 'src/app/core/pipes/order-by.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
    ProprietarComponent,
    InfoProprietarComponent,
    VehiculComponent,
    InfoVehiculComponent,
    OferteAsiguratoriComponent,
    SoferComponent,
    OrderSubmitComponent,
    WorkflowComponent,
    AddressComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AsigurareRcaRoutingModule,
    GooglePlaceModule,
  ],
  exports: [
    ProprietarComponent,
    VehiculComponent,
    OferteAsiguratoriComponent,
    OrderSubmitComponent,
    WorkflowComponent,
    AddressComponent,
    GooglePlaceModule,
  ]
})
export class AsigurareRcaModule { }
