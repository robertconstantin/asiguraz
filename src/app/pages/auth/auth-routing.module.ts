import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmInviteComponent } from './confirm-invite/confirm-invite.component';
import { ResendConfirmEmailComponent } from './resend-confirm-email/resend-confirm-email.component';

const routes: Routes = [
  // { path: 'auth/register-success', component: RegisterSuccessComponent },
  { path: 'auth/confirm-email/:code/:user', component: ConfirmEmailComponent },
  { path: 'auth/confirm-invite/:code/:user', component: ConfirmInviteComponent },
  // { path: 'auth/resend-confirm-email', component: ResendConfirmEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
