import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Actions,
  Controllers,
} from 'src/app/shared/global-variables/api-config';
import { AppSettings } from 'src/app/shared/models/objectmodels';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';
import { BaseAppSettingsComponent } from '../base-app-settings/base-app-settings.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  public appSettings: AppSettings;

  public contactUsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
    ]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  constructor(
    public baseService: BaseServiceService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public notification: NotificationServiceService,
  ) { }

  ngOnInit(): void {
    this.getAppSettings();
  }
  getAppSettings() {
    this.spinner.show();
    this.baseService.getAppSettings().subscribe((res) => {
      this.appSettings = res as AppSettings;
      this.spinner.hide();
    });
  }

  onSubmitContactUs() {
    if (this.contactUsForm.invalid) {
      this.spinner.hide();
      this.contactUsForm.markAllAsTouched();
      this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Contact Us' : 'اتصل بنا', this.translate.currentLang == 'EN' ? 'Please Fill All Required Fields' : 'يرجى ملئ الحقول المطلوبة', 'warn')
    }
    else {
      this.spinner.show();
      const form = this.contactUsForm.getRawValue();
      this.baseService
        .postItem(Controllers.ContactUs, Actions.PostItem, form)
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.contactUsForm.reset();
            this.notification.showNotification(
              this.translate.currentLang == 'EN' ? 'Contact Us' : 'اتصل بنا',
              this.translate.currentLang == 'EN' ? 'Request has been Submittied Successfully' : 'تم تقديم الطلب بنجاح',
              'success'
            );
          },
          (error) => {
            this.spinner.hide();
            this.notification.showNotification(this.translate.currentLang == 'EN' ? 'Contact Us' : 'اتصل بنا', this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما', 'error');
          }
        );
    }
  }

  public convertToNumber(value: string) {
    return Number(value);
  }




}
