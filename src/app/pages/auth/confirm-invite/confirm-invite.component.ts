import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { User } from '../../../core/models/user/user.model';
import { UserLogin } from '../../../core/models/user/user-login.model';
import { AppSession } from '../../../core/models/user/app-session.model';

import { UserService } from '../../../core/services/user/user.service';
import { AppStorageService } from '../../../core/services/base/app-storage.service';

@Component({
  selector: 'app-confirm-invite',
  templateUrl: './confirm-invite.component.html'
})
export class ConfirmInviteComponent implements OnInit {

  public error = false;
  public success = false;
  public loading = false;

  public userDetails: User = new User();
  public user = '';
  public code = '';
  public newPassword = '';

  // form
  public form: FormGroup;
  public output: any;
  public submittedForm: any;

  constructor(
    private userService: UserService,
    private appStorageService: AppStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(4)]]
      }, { validator: this.passwordMatch });
    this.form.valueChanges.subscribe(data => {
      this.output = data;
    });
  }

  passwordMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmNewPassword').value) {
      return { invalid: true };
    }
  }

  ngOnInit() {
    this.code = this.route.snapshot.params['code'];
    this.user = this.route.snapshot.params['user'];
    this.getUser();
  }

  getUser() {
    this.loading = true;
    this.userService.getByConfirmData(this.user, this.code).then((result: User) => {
      this.loading = false;
      if (result && result.email) {
        this.userDetails = result;
      } else {
        this.error = true;
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.submittedForm = this.form.value;
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsTouched();
      }
    }
    if (this.form.valid) {
      this.userService.confirmInvite(this.user, this.code, this.newPassword).then((result: AppSession) => {
          this.loading = false;
          if (result && result.session_token) {
            this.appStorageService.setAppSession(result, false);
            this.router.navigate(['/']);
          } else {
            this.error = true;
          }
      });
    } else {
      this.loading = false;
    }
  }

}
