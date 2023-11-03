import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../core/models/user/user.model';
import { UserLogin } from '../../../core/models/user/user-login.model';
import { AppSession } from '../../../core/models/user/app-session.model';

import { UserService } from '../../../core/services/user/user.service';

@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html'
})

export class ConfirmEmailComponent implements OnInit {

    public error = false;
    public loading = true;
    public success = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        const code = this.route.snapshot.params['code'];
        const user = this.route.snapshot.params['user'];
        this.confirmEmail(user, code);
    }

    confirmEmail(user, code) {
        this.userService.confirmEmail(user, code).then((result) => {
            this.loading = false;
            if (result) {
                this.error = !result;
            } else {
                this.error = true;
            }
        });
    }
}
