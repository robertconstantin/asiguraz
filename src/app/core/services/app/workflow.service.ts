import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// service
import { AppStorageService } from '../base/app-storage.service';
import { GlobalEventsService } from '../base/global-events.service';
import { SiteService } from './site.service';
import { UserService } from '../user/user.service';
// models
import { Proprietar } from 'src/app/core/models/api/polita/proprietar.model';
import { UserRegister } from 'src/app/core/models/user/user-register.model';
import { AppSession } from 'src/app/core/models/user/app-session.model';
import { PolitaService } from '../core/polita.service';

@Injectable()
export class WorkflowService {


    constructor(
        private globalEventsService: GlobalEventsService,
        private router: Router,
        private siteService: SiteService,
        private userService: UserService,
        private politaService: PolitaService,
        private appStorageService: AppStorageService) {
    }

    goToStep(stepName: string) {
        this.router.navigate(['asigurare-rca.html', stepName]);
        if (stepName === 'vehicul') {
          this.checkUserExists();
        }
    }

    checkUserExists() {
        const user = this.appStorageService.isUserLoggedIn();
        if (!user) {
            const proprietar = this.politaService.getProprietar() as Proprietar;
            if (proprietar && proprietar.email) {
                this.userService.checkAvailability(proprietar.email).then((result: boolean) => {
                    console.log('checkUserExists', result);
                    if (result === true) {
                        this.subscribeUser(proprietar);
                    } else {
                        this.siteService.getLoginSidebar(proprietar.email);
                    }
                });
            }
        }
    }

    subscribeUser(proprietar: Proprietar) {
      if (proprietar && proprietar.email) {
          const userRegister = new UserRegister();
          userRegister.email = proprietar.email;
          userRegister.phone = proprietar.telefonMobil;
          userRegister.first_name = '';
          userRegister.last_name = '';
          this.userService.subscribeUser(userRegister).then((result: AppSession) => {
              this.appStorageService.setAppSession(result, true);
              this.globalEventsService.currentUser.emit(result.user);
          });
      }
    }

}
