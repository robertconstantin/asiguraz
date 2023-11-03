import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSubmitComponent } from './order-submit/order-submit.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { VehiculComponent } from './vehicul/vehicul.component';
import { ProprietarComponent } from './proprietar/proprietar.component';
import { OferteAsiguratoriComponent } from './oferte-asiguratori/oferte-asiguratori.component';

const routes: Routes = [
  { path: 'asigurare-rca.html', component: WorkflowComponent,  children: [
    { path: '', redirectTo: 'proprietar', pathMatch: 'full' },
    { path: 'proprietar', component: ProprietarComponent,  },
    { path: 'vehicul', component: VehiculComponent, },
    { path: 'oferte-asiguratori', component: OferteAsiguratoriComponent, },
    { path: 'finalizare-comanda', component: OrderSubmitComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsigurareRcaRoutingModule { }
