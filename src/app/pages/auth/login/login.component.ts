import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

// forms and validations
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// services
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
// models
import { UserLogin } from 'src/app/core/models/user/user-login.model';
import { AppSession } from 'src/app/core/models/user/app-session.model';
import { GlobalEventsService } from 'src/app/core/services/base/global-events.service';
import { SiteService } from 'src/app/core/services/app/site.service';


declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  // form
  public form: FormGroup;
  public error = false;
  public loading = false;
  public userLogin: UserLogin = new UserLogin();
  public userRememberMe = false;

  public message: string;
  private currentRoute: string;

  // inputs
  // @Input() email = '';

  constructor(
      private globalEventsService: GlobalEventsService,
      private appStorageService: AppStorageService,
      private userService: UserService,
      private router: Router,
      private siteService: SiteService,
      private formBuilder: FormBuilder) {

      // form creation
      this.form = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(4)]],
          userRememberMe: [false]
      });
      this.form.valueChanges.subscribe(data => {
      });
      this.siteService.currentEmail.subscribe(message => this.form.get('email').setValue(message));
      

      this.currentRoute = this.router.url;
  }

  onSubmit() {
      this.loading = true;
      for (const i in this.form.controls) {
        if (this.form.controls.hasOwnProperty(i)) {
          this.form.controls[i].markAsTouched();
        }
      }
      if (this.form.valid) {
          this.userService.login(this.userLogin).then(
              (appSession: AppSession) => {
                  this.loading = false;
                  if (appSession) {
                      this.appStorageService.setAppSession(appSession, this.userRememberMe);
                      this.globalEventsService.currentUser.emit(appSession.user);
                      this.siteService.removeSidebar();
                      this.appStorageService.set('storedEmail', null);
                      this.currentRoute = this.router.url;
                      if (this.currentRoute.toLowerCase().indexOf('asigurare-rca') < 0) {
                        this.router.navigate(['/user']);
                      }
                  } else {
                      // error
                      this.error = true;
                  }
              }
          );
      } else {
        this.appStorageService.set('storedEmail', this.userLogin.email);
        this.loading = false;
        this.error = false;
      }
  }

  public forgotPassword() {
    this.appStorageService.set('storedEmail', this.userLogin.email);
    this.router.navigate(['/forgot-password.html']);
  }

}
