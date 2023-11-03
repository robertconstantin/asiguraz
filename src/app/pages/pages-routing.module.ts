import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login.html', component: HomeComponent },
    { path: 'sign-up.html', component: HomeComponent },
    { path: 'forgot-password.html', component: HomeComponent },
    { path: 'reset-password/:code/:user', component: HomeComponent },
    { path: 'contul-meu.html', component: HomeComponent },
    // { path: '', component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
