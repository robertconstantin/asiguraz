import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciiComponent } from './servicii/servicii.component';
import { DespreNoiComponent } from './despre-noi/despre-noi.component';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'servicii.html', component: ServiciiComponent },
  { path: 'despre-noi.html', component: DespreNoiComponent },
  { path: 'contact.html', component: ContactComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DePrezentareRoutingModule { }
