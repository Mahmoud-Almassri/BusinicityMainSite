import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { resetPasswordSteps } from 'src/app/shared/enums/enums';
import { Actions, Controllers } from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  currentStep: number = resetPasswordSteps.enterEmail;
  showEmail = true;
  showMobileNumber = false;
  public isMatch : boolean = false
  keyNumber: number;
  public phoneNumber: string;
  emailValue: string = "";
  mobileNumberValue: string = "";

  codeNumbersArr = [
    { id: "1", value: "" },
    { id: "2", value: "" },
    { id: "3", value: "" },
    { id: "4", value: "" },
    { id: "5", value: "" },
    { id: "6", value: "" },
  ]

  hidePassword = true;
  hideConfirmPassword = true;

  updatePasswordForm: FormGroup

  public forgetPasswordForm = new FormGroup({
    emailAddress : new FormControl(),
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern(/^7[789]\d{7}$/g), Validators.minLength(9), Validators.maxLength(9)]),
    language : new FormControl(),
  })

  constructor(private formBuilder: FormBuilder,
    private baseService: BaseServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService,
    private notification: NotificationServiceService,
    private languageService: LanguageService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.keyNumber = 962;
    this.forgetPasswordForm.controls['language'].setValue(this.languageService.getCurrentLanguage());
    this.updatePasswordForm = this.formBuilder.group({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      token: new FormControl(),
      emailAddress: new FormControl(),
      userId: new FormControl(),
    })
    console.log(this.route.url)
    if (this.activatedRoute.snapshot.queryParams['uemail']) {
      this.activatedRoute.params.subscribe(param => {
        console.log(this.activatedRoute.snapshot.queryParams['uemail'])
        if (param != null) {
          this.updatePasswordForm.get('emailAddress').setValue(this.activatedRoute.snapshot.queryParams['uemail'])
          this.updatePasswordForm.get('token').setValue(this.activatedRoute.snapshot.queryParams['token'])
          this.currentStep = resetPasswordSteps.updatePassword
        }
      })
    }
  }


  radioChange(value) { 
    if (value == 1) {
      this.showEmail = true;
      this.showMobileNumber = false;
      this.mobileNumberValue = ""
      //this.forgetPasswordForm.get('').setValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    } else {
      this.showMobileNumber = true;
      this.showEmail = false;
      this.emailValue = ""
    }
  }
  checkPassword() {
    const password = this.updatePasswordForm.get('password').value
    const confirmPassword = this.updatePasswordForm.get('confirmPassword').value

    if (password == confirmPassword) {
      this.isMatch = true
      return this.isMatch
    } else {
      this.isMatch = false
      return this.isMatch
    }
  }

  setEmailValue(value) {
    this.emailValue = value;
    console.log(value);
  }

  setMobileNumberValue(value) {
    this.mobileNumberValue = value;
    console.log(value);
  }

  onResetClick() {

    const form = this.forgetPasswordForm.value
    if (this.showEmail) {
      form.emailAddress = this.emailValue
    }
     if (this.showMobileNumber) {
      form.phoneNumber = this.keyNumber + this.mobileNumberValue;
      this.phoneNumber=this.keyNumber +this.mobileNumberValue;
    }
    this.spinner.show()
    if (!this.forgetPasswordForm.invalid) {
      this.baseService.postItem(Controllers.Auth, Actions.ForgetPassword, form).subscribe(res => {
        this.spinner.hide()
        if (this.showEmail) {
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Forget Password' : 'نسيت كلمة السر', this.translate.currentLang == 'EN' ? "تفقد بريدك الالكتروني من فضلك" : 'حدث خطا ما', "error")
          this.route.navigate(['/login'])
        } else if (this.showMobileNumber) {
          this.currentStep = resetPasswordSteps.enterConfirmationCode
        }
      }, error => {
        this.spinner.hide(),
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Forget Password' : 'نسيت كلمة السر', this.translate.currentLang == 'EN' ? "Something went wrong " : 'حدث خطا ما', "error")
      })
    } else {
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Forget Password' : 'نسيت كلمة السر', this.translate.currentLang == 'EN' ? "Invalid EmailAddress Or Phone " : 'عنوان البريد الإلكتروني أو الهاتف غير صالح', "error")
    }
  }

  validateCodeNumber(event) {
    if (event.target.value) {
      let value: string = event.target.value.toString().slice(-1);
      (<HTMLInputElement>document.getElementById(event.target.id)).value = value;
      this.codeNumbersArr.find(x => x.id == event.target.id).value = value;

      if (event.target.id < 6)
        document.getElementById((parseInt(event.target.id) + 1).toString()).focus()

      var isCompleted = true;
      for (let item of this.codeNumbersArr) {
        if (item.value == "") {
          isCompleted = false;
          break
        }
      }

      if (isCompleted) {
        var code = ''
        for (let item of this.codeNumbersArr) {
          code += item.value;
        }
        console.log(code);
        const req = {
          phoneNumber: this.phoneNumber,
          code: code
        }
        this.baseService.postItem(Controllers.Auth, Actions.ValidateResetPasswordCode, req).subscribe(res => {
          this.currentStep = resetPasswordSteps.updatePassword;
          this.updatePasswordForm.controls['userId'].setValue(res);
        }, error => {
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Reset Password' : 'إعادة تعيين كلمة المرور', this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما', 'error');
        })
      }

    } else {
      (<HTMLInputElement>document.getElementById(event.target.id)).value = ""
      this.codeNumbersArr.find(x => x.id == event.target.id).value = "";
    }
  }

  backToEmail() {
    this.resetConfirmationCodeEntry();
    this.currentStep = resetPasswordSteps.enterEmail;
  }

  resetConfirmationCodeEntry() {
    this.codeNumbersArr = [
      { id: "1", value: "" },
      { id: "2", value: "" },
      { id: "3", value: "" },
      { id: "4", value: "" },
      { id: "5", value: "" },
      { id: "6", value: "" },
    ]

    for (var i = 1; i <= 6; i++) {
      (<HTMLInputElement>document.getElementById(i.toString())).value = ""
    }
  }


  onUpdatePassword() {
    if (this.checkPassword()) {
      this.spinner.show()
      const form = this.updatePasswordForm.value
      this.baseService.postItem(Controllers.Auth, Actions.resetPassword, form).subscribe(res => {
        this.spinner.hide()
        this.route.navigate(['/login'])
      }, error => {
        if (error.status === 400) {
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Reset Password' : 'إعادة تعيين كلمة المرور', error.error.Message, 'error');
        }
        else {
          this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Reset Password' : 'إعادة تعيين كلمة المرور', this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما', 'error');
        }
        this.spinner.hide();
      });
    }
    else {
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Reset Password' : 'إعادة تعيين كلمة المرور', this.translate.currentLang == 'EN' ? "password dosent\'t match confirm password" : 'تأكيد كلمة المرور لا يطابق كلمة المرور', "error");
    }


  }
}
