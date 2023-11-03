import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingElementComponent } from './loading-element/loading-element.component';
// import { UserMenuComponent } from './menu/user-menu.component';
import { HighlightDirective } from '../../core/directives/highlight.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserAlt, faKey, faCog, faShieldAlt, faSignOutAlt, faDownload, faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin, faPinterest, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  declarations: [
    LoadingElementComponent,
    HighlightDirective
    // UserMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    LoadingElementComponent,
    HighlightDirective,
    // UserMenuComponent,
    FontAwesomeModule,
  ]
})
export class SharedModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(
      faInstagram,
      faFacebook,
      faLinkedin,
      faPinterest,
      faTwitter,
      faGoogle,
      faUserAlt,
      faKey,
      faCog,
      faShieldAlt,
      faSignOutAlt,
      faDownload,
      faTimes,
      faEnvelope
    );
  }
}
