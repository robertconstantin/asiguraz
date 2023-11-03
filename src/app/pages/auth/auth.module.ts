import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmInviteComponent } from './confirm-invite/confirm-invite.component';
import { ResendConfirmEmailComponent } from './resend-confirm-email/resend-confirm-email.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    ConfirmInviteComponent,
    ResendConfirmEmailComponent,
    RegisterSuccessComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AuthRoutingModule,
    SignUpComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    ConfirmInviteComponent,
    ResendConfirmEmailComponent,
    RegisterSuccessComponent,
  ]
})
export class AuthModule { }
