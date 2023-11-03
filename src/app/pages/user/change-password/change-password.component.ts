import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../../core/services/user/user.service';

declare var toastr: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  public current_password: string;
  public new_password: string;
  public confirm_new_password: string;
  // form
  public changePasswordForm: FormGroup;
  public output: any;
  public submittedForm: any;

  constructor(public userService: UserService, public formBuilder: FormBuilder) {
      // change passsword validation
      this.changePasswordForm = formBuilder.group({
          current_password: ['', [Validators.required, Validators.minLength(4)]],
          new_password: ['', [Validators.required, Validators.minLength(4)]],
          confirm_new_password: ['', [Validators.required, Validators.minLength(4)]]
      }, { validator: this.passwordConfirming });
      this.changePasswordForm.valueChanges.subscribe(data => {
          this.output = data;
      });
  }

  ngOnInit() {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.get('new_password').value !== c.get('confirm_new_password').value) {
          return { invalid: true };
      }
  }

  changePassword() {
      this.submittedForm = this.changePasswordForm.value;
      for (const i in this.changePasswordForm.controls) {
        if (this.changePasswordForm.controls.hasOwnProperty(i)) {
          this.changePasswordForm.controls[i].markAsTouched();
        }
      }
      if (this.changePasswordForm.valid) {
          this.userService.changePassword(this.new_password).then(
              (result) => {
                  this.changePasswordForm.reset();
                  this.success();
              });
      }
  }

  success(): void {
    toastr.options = {
      iconClass: '',
      positionClass: 'toast-top-right'
    };
    toastr.success('Great idea!');
  }

}
