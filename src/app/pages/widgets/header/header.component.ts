import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AppStorageService } from '../../../core/services/base/app-storage.service';
import { UserService } from '../../../core/services/user/user.service';
import { GlobalEventsService } from '../../../core/services/base/global-events.service';

// models
import { User } from '../../../core/models/user/user.model';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User = null;
  opened: boolean = false;

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

  toggleMenu(){
	    $('.header nav').toggleClass('slide');
	    $('.burger').toggleClass('active');
		  $('.container-perspective').toggleClass('push-content');
  }

  closeMenu() {
    if($('.container-perspective').hasClass('push-content')){
      this.toggleMenu()
    }
  }

  toggleLayout(always: boolean): void {
    const body = document.body;
    const collapsed = body.getAttribute('data-collapsed') !== 'true' ? 'true' : 'false';
    body.setAttribute('data-collapsed', collapsed);
    const layout = body.getAttribute('data-layout');
    if (layout === 'sidebar-over-1') {
        const backdrop = $('.left-sidebar-backdrop');
        if (backdrop.hasClass('in')) {
            backdrop.removeClass('fade');
            backdrop.removeClass('in');
        } else {
            backdrop.toggleClass('fade in');
        }
    }
  }

}
