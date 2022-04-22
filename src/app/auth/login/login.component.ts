import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, Controllers } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';
import { AuthorizeServiceService } from '../authorize-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  hide = true;

  public signInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private translate: TranslateService,
    private baseService: BaseServiceService,
    private authService: AuthorizeServiceService,
    private router: Router,
    private notification: NotificationServiceService,
    private spinner: NgxSpinnerService,
    private externalAuthService: SocialAuthService

  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.spinner.show()
    if (!this.signInForm.invalid) {
      const signInForm = this.signInForm.value;
      this.baseService.postItem(Controllers.Auth, Actions.Login, signInForm).subscribe(res => {
        this.authService.setToken((res as any).accessToken);
        this.spinner.hide()
        this.router.navigate(['/main/home'])
      }, error => {
        if (error.status === 400) {
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Login' : 'تسجيل الدخول', this.translate.currentLang == 'EN' ? 'Username or password is wrong' : 'اسم المستخدم أو كلمة السر غير صحيحة',
            'error'
          );
        }
        else {
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Login' : 'تسجيل الدخول', this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما',
            'error'
          );
        }
        this.spinner.hide();
      })
    }
    else{
      this.spinner.hide();
      this.signInForm.markAllAsTouched();
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Login' : 'تسجيل الدخول', this.translate.currentLang == 'EN' ? 'Please Fill All Required Fields' : 'يرجى ملئ الحقول المطلوبة','warn')
    }
  }
  public externalLogin = () => {
    this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        const user: SocialUser = { ...res };
        console.log(user);
        const externalAuth = {
          provider: user.provider,
          idToken: user.idToken
        }
        this.validateExternalAuth(externalAuth);
      }, error => console.log(error))
  }
  public externalLinkedInLogin() {
    this.baseService.postItem(Controllers.Auth,Actions.ExternalLinkedinLogin,{}).subscribe(res=>{
      this.authService.setToken((res as any).token);
      this.router.navigate(['/main/home'])
    },error=>{

    })
  }
  private validateExternalAuth(externalAuth: any) {
    this.authService.externalLogin(`${environment.apiPreLink}auth/ExternalLogin`, externalAuth)
      .subscribe(res => {
        this.authService.setToken((res as any).token);
        this.router.navigate(['/main/home'])
      },
        error => {
        });
  }
}
