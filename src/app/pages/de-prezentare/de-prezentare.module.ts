import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DePrezentareRoutingModule } from './de-prezentare-routing.module';
import { ServiciiComponent } from './servicii/servicii.component';
import { DespreNoiComponent } from './despre-noi/despre-noi.component';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ServiciiComponent,
    DespreNoiComponent,
    ContactComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    DePrezentareRoutingModule,
    SharedModule
  ],
  exports: [
    DePrezentareRoutingModule,
    ServiciiComponent,
    DespreNoiComponent,
    ContactComponent,
    TestComponent
  ]
})
export class DePrezentareModule { }
