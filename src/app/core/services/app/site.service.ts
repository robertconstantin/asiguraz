import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user/user.model';

declare var $: any;

@Injectable()
export class SiteService {

    private emailSource = new BehaviorSubject('default message');
    currentEmail = this.emailSource.asObservable();

    constructor() { }

    getLoginSidebar(email) {
      document.getElementById('loggin-button').click();
      this.addEmail(email);
    }

    addEmail(email: string) {
      this.emailSource.next(email)
    }

    removeSidebar() {
      const divUser = $('.popup-data-user');
      const divShop = $('.popup-data-shop');
      const div2 = $('.container-perspective');
      const html = $('html');
      const body = $('body');
      html.removeClass('full-h overflow');
      body.removeClass('full-h overflow');
      divUser.removeClass('active');
      divShop.removeClass('active');
      div2.removeClass('persp add-effect');
    }
}
