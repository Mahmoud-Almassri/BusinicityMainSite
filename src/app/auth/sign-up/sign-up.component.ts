import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, Controllers } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';
import { AuthorizeServiceService } from '../authorize-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public isMatch: boolean = false
  public step: number = 1
  hidePassword = true;
  hideConfirmPassword = true;
  keyNumber: number;
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    firstName: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    thirdName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^7[789]\d{7}$/g), Validators.minLength(9), Validators.maxLength(9)]),
    address: new FormControl('', [Validators.required]),
    language: new FormControl(''),
  });

  personForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    thirdName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    personalEmail: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    saluation: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    userId: new FormControl(''),
  })

  signUpValue(formControl) {
    return this.signUpForm.get(formControl).value
  }

  checkPassword() {
    const password = this.signUpForm.get('password').value
    const confirmPassword = this.signUpForm.get('confirmPassword').value

    if (password == confirmPassword) {
      this.isMatch = true
      return this.isMatch
    } else {
      this.isMatch = false
      return this.isMatch
    }
  }

  constructor(
    private baseService: BaseServiceService,
    private notification: NotificationServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthorizeServiceService,
    private languageService: LanguageService,
    private externalAuthService: SocialAuthService,
    public translate: TranslateService
  ) { }



  ngOnInit(): void {
    this.keyNumber = 962;
    this.signUpForm.controls['language'].setValue(this.languageService.getCurrentLanguage());
  }







  goBack(stepper: MatStepper) {
    stepper.previous();
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
  private validateExternalAuth(externalAuth: any) {
    this.authService.externalLogin(`${environment.apiPreLink}auth/ExternalLogin`, externalAuth)
      .subscribe(res => {
        this.authService.setToken((res as any).token);
        this.router.navigate(['/main/home'])
      },
        error => {
        });
  }
  goForward(stepper: MatStepper) {
    //implement api integration to sign up
    if (this.signUpForm.invalid) {
      this.spinner.hide();
      this.signUpForm.markAllAsTouched();
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Login' : 'تسجيل الدخول', this.translate.currentLang == 'EN' ? 'Please Fill All Required Fields' : 'يرجى ملئ الحقول المطلوبة', 'warn')
    }
    else {
      if (this.checkPassword()) {
        if (!this.signUpForm.invalid) {
          this.spinner.show();
          const FullName = this.signUpValue('firstName') + ' ' + this.signUpValue('secondName') + ' ' + this.signUpValue('thirdName') + ' ' + this.signUpValue('lastName')
          const form = this.signUpForm.getRawValue()
          form.fullName = FullName
          form.userName = this.signUpValue('email')
          form.phoneNumber = this.keyNumber + form.phoneNumber
          this.baseService.postItem(Controllers.Auth, Actions.UserRegistration, form).subscribe(res => {
            this.setPersonDetails();
            stepper.next();
            this.step = 2;
            this.personForm.controls['userId'].setValue(res.userId);
            this.spinner.hide();
          }, error => {
            console.log(error);
            this.spinner.hide();
            this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Registration' : 'تسجيل', error.error.Message, 'error')
          })
        }
      } else {
        this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Registration' : 'تسجيل', this.translate.currentLang == 'EN' ? "password dosent\'t match confirm password" : 'تأكيد كلمة المرور لا يطابق كلمة المرور', 'error')
      }
    }

  }

  onAddPerson() {
    if (this.personForm.invalid) {
      this.spinner.hide();
      this.personForm.markAllAsTouched();
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Registration' : 'تسجيل', this.translate.currentLang == 'EN' ? 'Please Fill All Required Fields' : 'يرجى ملئ الحقول المطلوبة', 'warn')
    }
    else {
    this.spinner.show();
    const form = this.personForm.value
    this.baseService.postItem(Controllers.WebPerson, Actions.PostItem, form).subscribe(res => {
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Registration' : 'تسجيل', this.translate.currentLang == 'EN' ? "Registration was successful" : 'تمت عملية التسجيل بنجاح', 'success');
      this.router.navigate(['/auth/login']);
      this.spinner.hide();
      console.log(res)
    }, error => {
      this.spinner.hide();
      console.log(error)
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Registration' : 'تسجيل', this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما', 'error')
    })
  }
  }


  setPersonDetails() {
    this.personForm.get('firstName').setValue(this.signUpValue('firstName'))
    this.personForm.get('secondName').setValue(this.signUpValue('secondName'))
    this.personForm.get('thirdName').setValue(this.signUpValue('thirdName'))
    this.personForm.get('lastName').setValue(this.signUpValue('lastName'))
    this.personForm.get('personalEmail').setValue(this.signUpValue('email'))
    this.personForm.get('mobileNo').setValue(this.signUpValue('phoneNumber'))
  }

  onSkip() {
    this.router.navigate(['/login'])
  }

}
