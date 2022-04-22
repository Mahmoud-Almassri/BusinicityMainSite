import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppSettings } from 'src/app/shared/models/objectmodels';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { BaseAppSettingsComponent } from '../base-app-settings/base-app-settings.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public appSettings : AppSettings ;
  constructor(
    public baseService:BaseServiceService,
    public spinner:NgxSpinnerService,
    public translate:TranslateService) {
  }

  ngOnInit(): void {
  this.getAppSettings()
  }
  getAppSettings(){
    this.spinner.show();
    this.baseService.getAppSettings().subscribe(res =>{
      this.appSettings = res as AppSettings;
      this.spinner.hide();
      console.log(this.appSettings)
    })
  }


}
