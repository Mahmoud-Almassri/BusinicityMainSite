import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthorizeGuard } from './authorize.guard';
import { RoleGuard } from './role.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeInterceptor } from './authorize.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthLayoutComponent,
    ResetPasswordComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [AuthorizeGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },

    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '274669251826-mepjo63l11rif8esdeqco2jurgtmjlhh.apps.googleusercontent.com'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }
  ]
})
export class BAuthModule { }
