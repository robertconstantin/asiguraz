import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../core/models/user/user.model';
import { UserLogin } from '../../../core/models/user/user-login.model';
import { AppSession } from '../../../core/models/user/app-session.model';

import { UserService } from '../../../core/services/user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-resend-confirm-email',
    templateUrl: './resend-confirm-email.component.html'
})

export class ResendConfirmEmailComponent implements OnInit {

  public loading = false;
  public error = false;
  public success = false;
  // form
  public form: FormGroup;
  public output: any;
  public submittedForm: any;

    constructor(
      public userService: UserService,
      public formBuilder: FormBuilder) {
      this.form = formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
      });
      this.form.valueChanges.subscribe(data => {
          this.output = data;
      });
    }

    ngOnInit() {
    }

    onSubmit(): void {
      this.loading = true;
      this.submittedForm = this.form.value;
      for (const i in this.form.controls) {
        if (this.form.controls.hasOwnProperty(i)) {
          this.form.controls[i].markAsTouched();
        }
      }
      if (this.form.valid) {
          this.userService.resendConfirmUserEmail().then(
              (result: boolean) => {
                  this.loading = false;
                  if (result) {
                      this.success = true;
                  } else {
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
