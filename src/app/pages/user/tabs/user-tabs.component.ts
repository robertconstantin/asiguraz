import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSession } from '../../../core/models/user/app-session.model';
import { User } from '../../../core/models/user/user.model';
import { AppStorageService } from '../../../core/services/base/app-storage.service';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.css']
})
export class UserTabsComponent implements OnInit {

  public activeTab = 'my-profile';
  public user: User = new User();

  constructor(private router: Router,
              private appStorageService: AppStorageService) {
    const appSession = this.appStorageService.getAppSession();
    if (appSession) {
        this.user = appSession.user;
    }
    this.activateTab();
  }

  ngOnInit() { }

  activateTab() {
      if (this.router.url.includes('my-profile')) {
          this.activeTab = 'my-profile';
      } else if (this.router.url.includes('change-password')) {
          this.activeTab = 'change-password';
      } else if (this.router.url.includes('users')) {
          this.activeTab = 'users';
      } else if (this.router.url.includes('roles')) {
          this.activeTab = 'roles';
      }
  }

  changeTab(newTab: string) {
      this.router.navigate([newTab]);
  }

}
