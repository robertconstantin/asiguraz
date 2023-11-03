import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabsComponent } from './tabs/user-tabs.component';
import { AsigurarileMeleComponent } from './asigurarile-mele/asigurarile-mele.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //
  { path: 'user',
    children: [
      // { path: '',  component: DashboardComponent },
      { path: '',  redirectTo: 'asigurarile-mele', pathMatch: 'full' },
      { path: 'asigurarile-mele',  component: AsigurarileMeleComponent },
      { path: 'asigurarile-mele/:userID/:identificatorOferta',  component: AsigurarileMeleComponent },
      { path: 'my-profile',  component: UserTabsComponent },
      { path: 'change-password',  component: UserTabsComponent },
      { path: 'setari',  component: SettingsComponent },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
