import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
// models
import { RequestData } from './models/api/request-data.model';
// repository
import { SoferRepository } from './repositories/core/sofer.repository';
import { PolitaRepository } from './repositories/core/polita.repository';
import { AutoRepository } from './repositories/broker24/auto.repository';
import { InsuranceRepository } from './repositories/broker24/insurance.repository';
// services
import { RequestInterceptor } from './interceptors/request.interceptor';
import { AppStorageService } from './services/base/app-storage.service';
import { GlobalEventsService } from './services/base/global-events.service';
import { UserService } from './services/user/user.service';
import { RoleService } from './services/user/role.service';
import { SiteService } from './services/app/site.service';
import { TypeService } from './services/broker24/type.service';
import { InsuranceService } from './services/broker24/insurance.service';
import { AutoService } from './services/broker24/auto.service';
import { PaymentService } from './services/user/payment.service';
import { ProprietarService } from './services/core/proprietar.service';
import { VehiculService } from './services/core/vehicul.service';
import { SoferService } from './services/core/sofer.service';
import { PolitaService } from './services/core/polita.service';
import { WorkflowService } from './services/app/workflow.service';
import { GlobalService } from './services/base/global.service';
import { SocietateAsigurareService } from './services/broker24/societate-asigurare.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CookieModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AppStorageService,
    GlobalEventsService,

    // asiguraz Repositories
    SoferRepository,
    PolitaRepository,
    AutoRepository,
    InsuranceRepository,

    UserService,
    RoleService,
    SiteService,
    TypeService,
    InsuranceService,
    AutoService,
    PaymentService,
    GlobalService,

    // asiguraz Services
    PolitaService,
    ProprietarService,
    SoferService,
    VehiculService,
    WorkflowService,

    // broker 24
    SocietateAsigurareService,

    RequestData,

    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [
    CookieModule
  ]
})
export class CoreModule {

  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [
  //       AppStorageService,
  //       GlobalEventsService,
  //       NavigationService,
  //       UserService,
  //       RoleService,
  //       SiteService,

  //       TypeService,
  //       InsuranceService,
  //       AutoService,
  //       PaymentService,

  //       ProprietarService,
  //       Proprietar,
  //       VehiculService,
  //       Vehicul,

  //       RequestData,
  //     ]
  //   };
  // }

}
