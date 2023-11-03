import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/core/models/user/user-register.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { AppSession } from 'src/app/core/models/user/app-session.model';
import { GlobalEventsService } from 'src/app/core/services/base/global-events.service';
import { SiteService } from 'src/app/core/services/app/site.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public model: any = {};
  public error = false;
  public loading = false;
  public userRegister: UserRegister = new UserRegister();

  // form
  public form: FormGroup;
  public output: any;
  public submittedForm: any;
  public suntDeAcord = false;
  public maAbonez = false;

    constructor(
        private globalEventsService: GlobalEventsService,
        private appStorageService: AppStorageService,
        private userService: UserService,
        private router: Router,
        private siteService: SiteService,
        private formBuilder: FormBuilder) {

        // form validation
        this.form = formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            suntDeAcord: ['', [Validators.required]],
            maAbonez: ['', [Validators.required]],
        });
        this.form.valueChanges.subscribe(data => {
            this.output = data;
        });
        // form validation
    }

    ngOnInit() {
    }

    onSubmit() {
        this.loading = true;
        this.submittedForm = this.form.value;
        for (const i in this.form.controls) {
          if (this.form.controls.hasOwnProperty(i)) {
            this.form.controls[i].markAsTouched();
          }
        }
        if (this.form.valid && this.suntDeAcord) {
            this.userService.register(this.userRegister).then(
                (session: AppSession) => {
                    this.loading = false;
                    if (session) {
                      this.appStorageService.setAppSession(session, true);
                      this.router.navigate(['/user']);
                      this.globalEventsService.currentUser.emit(session.user);
                      this.siteService.removeSidebar();
                    } else {
                        // error
                        this.error = true;
                    }
                }
            );
        } else {
            this.loading = false;
            this.error = false;
        }
    }

}
