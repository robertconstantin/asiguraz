import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { UserService } from '../../../core/services/user/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {

  public error = false;
  public success = false;
  public loading = false;

  public new_password: string;
  private code: string;
  private user: string;
  // form
  public form: FormGroup;
  public output: any;
  public submittedForm: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        new_password: ['', [Validators.required, Validators.minLength(4)]],
        confirm_new_password: ['', [Validators.required, Validators.minLength(4)]]
    }, { validator: this.passwordMatch });
    this.form.valueChanges.subscribe(data => {
        this.output = data;
    });

  }

  ngOnInit() {
  }

  passwordMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get('new_password').value !== c.get('confirm_new_password').value) {
      return { invalid: true };
    }
}

  onSubmit() {
    this.code = this.route.firstChild.snapshot.params['code'];
    this.user = this.route.firstChild.snapshot.params['user'];
    this.loading = true;
    this.submittedForm = this.form.value;
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsTouched();
      }
    }
    if (this.form.valid) {
      this.userService.resetPassword(this.user, this.code, this.new_password).then((result: boolean) => {
          this.loading = false;
          if (result) {
              this.success = true;
          } else {
              this.error = true;
          }
      });
    } else {
      this.loading = false;
    }

  }

}
