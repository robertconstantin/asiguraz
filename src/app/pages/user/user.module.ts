import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserTabsComponent } from './tabs/user-tabs.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import { AsigurarileMeleComponent } from './asigurarile-mele/asigurarile-mele.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserTabsComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    SettingsComponent,
    AsigurarileMeleComponent,
    DashboardComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    UserRoutingModule,
    UserTabsComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    SettingsComponent,
    AsigurarileMeleComponent,
    DashboardComponent
  ]
})
export class UserModule { }
