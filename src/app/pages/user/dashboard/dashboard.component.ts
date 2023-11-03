import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { GlobalEventsService } from '../../../core/services/base/global-events.service';
import { AppStorageService } from '../../../core/services/base/app-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private appStorageService: AppStorageService,
              private globalEventsService: GlobalEventsService) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
    this.userService.logout().then((result) => {
      this.appStorageService.removeAppSession();
      this.globalEventsService.currentUser.emit(null);
    });
  }

}
