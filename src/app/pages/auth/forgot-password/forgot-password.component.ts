import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { AppStorageService } from 'src/app/core/services/base/app-storage.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent {

  public loading = false;
  public error = false;
  public success = false;
  // form
  public form: FormGroup;
  private submittedForm: any;
  public emailAddress: string;

  constructor(
    private userService: UserService,
    private appStorageService: AppStorageService,
    private formBuilder: FormBuilder) {

    this.emailAddress = this.appStorageService.getString('storedEmail');
    this.form = this.formBuilder.group({
      email: [this.emailAddress, [Validators.required, Validators.email]],
    });
    this.form.valueChanges.subscribe(data => {
    });
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
          this.userService.forgotPassword(this.submittedForm.email).then(
              (result: boolean) => {
                  this.loading = false;
                  if (result) {
                    this.success = true;
                    this.error = false;
                  } else {
                    this.success = false;
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
