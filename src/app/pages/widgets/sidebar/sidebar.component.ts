import { Component, OnInit } from '@angular/core';
import { AppStorageService } from '../../../core/services/base/app-storage.service';
import { GlobalEventsService } from '../../../core/services/base/global-events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../core/models/user/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private user: User = null;
  public isLogin = false;
  public isSignUp = false;
  public isForgotPassword = false;
  public isResetPassword = false;

  constructor(
    private appStorageService: AppStorageService,
    private globalEventsService: GlobalEventsService,
    private router: Router
  ) {
    // get local user
    this.user = this.appStorageService.isUserLoggedIn();

    // subscribe for changes
    this.globalEventsService.currentUser.subscribe((currentUser: User) => {
      this.user = currentUser;
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isSignUp = this.router.url.includes('sign-up') && !this.user;
      this.isForgotPassword = this.router.url.includes('forgot-password') && !this.user;
      this.isResetPassword = this.router.url.includes('reset-password') && !this.user;
      this.isLogin = !this.isSignUp && !this.isForgotPassword && !this.isResetPassword && !this.user;
    });
  }
}
