import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Actions,
  Controllers,
} from 'src/app/shared/global-variables/api-config';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';
import { Location } from '@angular/common';
import * as introJs from 'intro.js';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss'],
})
export class AddBusinessComponent implements OnInit {
  introJS = introJs();

  public businessForm = new FormGroup({
    id: new FormControl(0),
    nationalNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    approvalStatus: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^07[789]\d{7}$/g),
    ]),
    businessType: new FormControl(''),
    businessStatus: new FormControl(''),
    country: new FormControl(''),
    City: new FormControl(''),
    noOfEmployees: new FormControl(''),
    contactInsideCompanyName: new FormControl('', [Validators.required]),
    contactInsideCompMobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^07[789]\d{7}$/g),
    ]),
    contactInsideCompEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    additionalInfo: new FormControl(),
  });

  constructor(
    private baseService: BaseServiceService,
    private spinner: NgxSpinnerService,
    private notification: NotificationServiceService,
    public translate: TranslateService,
    public location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
   }

  onSave() {
    if (this.businessForm.invalid) {
      this.spinner.hide();
      this.businessForm.markAllAsTouched();
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Business' : 'الشركة', this.translate.currentLang == 'EN' ? 'Please Fill All Required Fields' : 'يرجى ملئ الحقول المطلوبة','warn')
    }
    else {
      this.spinner.show();
      const form = this.businessForm.getRawValue();
      form.noOfEmployee = ' ';
      form.City = ' ';
      form.country = ' ';
      form.businessType = ' ';
      this.baseService
        .postItem(Controllers.WebBUsiness, Actions.PostItem, form)
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.businessForm.reset();
            this.businessForm.controls.approvalStatus.setValue(0);
            this.notification.showNotification(
              this.translate.currentLang == 'EN' ? 'Business' : 'الشركة',
              this.translate.currentLang == 'EN'
                ? 'Business has been Added Successfully'
                : 'تمت اضافة الشركة بنجاح',
              'success'
            );
            this.router.navigate(['/main/home']);
          },
          (error) => {
            this.spinner.hide();
            this.notification.showNotification(
              this.translate.currentLang == 'EN' ? 'Business' : 'الشركة',
              this.translate.currentLang == 'EN'
                ? 'Something went wrong'
                : 'هناك خطأ ما',
              'error'
            );
          }
        );
    }
  }

  onCancel() {
    this.location.back()
  }


  //demoo
defineIntroSteps() {
  this.introJS.setOptions({
    exitOnOverlayClick: false,
    showStepNumbers: false,
    overlayOpacity: 0.6,
    steps: [
      {
        element: '#step1',
        intro: this.translate.instant('Intro.Business.BusinessForm'),
        position: 'top'
      },
      {
        element: '#step2',
        intro: this.translate.instant('Intro.Business.Submit'),
        position: 'left'
      },
    ]
  })
}

OnStartDemo() {
this.defineIntroSteps()
this.introJS.start();
}

}
