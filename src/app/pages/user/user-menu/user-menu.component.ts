import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { GlobalEventsService } from 'src/app/core/services/base/global-events.service';
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public user: User = new User();

  constructor(private router: Router,
              private userService: UserService,
              private appStorageService: AppStorageService,
              private globalEventsService: GlobalEventsService) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
    this.user = null;
    this.userService.logout().then((result) => {
      this.appStorageService.removeAppSession();
      this.globalEventsService.currentUser.emit(null);
    });
  }

}
