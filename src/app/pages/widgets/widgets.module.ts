import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ShoppingCartComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    AuthModule,
    SharedModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ShoppingCartComponent,
    SidebarComponent,
  ]
})
export class WidgetsModule { }
