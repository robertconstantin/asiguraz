import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user/user.model';
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { GlobalEventsService } from 'src/app/core/services/base/global-events.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public currentYear = new Date().getFullYear();
  public user: User = null;

  constructor(
    private appStorageService: AppStorageService,
    private globalEventsService: GlobalEventsService) {

      // get local user
    const appSession = this.appStorageService.getAppSession();
    this.user = appSession ? appSession.user : null;

    // subscribe for changes
    this.globalEventsService.currentUser.subscribe((currentUser: User) => {
      this.user = currentUser;
    });
  }

  ngOnInit() { }

}
