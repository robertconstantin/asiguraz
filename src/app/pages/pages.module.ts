import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AsigurareRcaModule } from './asigurare-rca/asigurare-rca.module';
import { ComingSoonComponent } from './coming-soon/coming-soon';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { DePrezentareModule } from './de-prezentare/de-prezentare.module';
import { WidgetsModule } from './widgets/widgets.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    ComingSoonComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AsigurareRcaModule,
    AuthModule,
    UserModule,
    DePrezentareModule,
    WidgetsModule,
    SharedModule,
    RouterModule,
    PagesRoutingModule
  ],
  exports: [
    AsigurareRcaModule,
    AuthModule,
    DePrezentareModule,
    ComingSoonComponent,
    HomeComponent,
    WidgetsModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
