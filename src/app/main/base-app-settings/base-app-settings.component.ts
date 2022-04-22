import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from 'src/app/shared/models/objectmodels';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';

@Component({
  selector: 'app-base-app-settings',
  template: ``,
  styleUrls: ['./base-app-settings.component.scss']
})
export class BaseAppSettingsComponent implements OnInit {

  public appSettings : AppSettings ;
  constructor(public baseService:BaseServiceService , public translate:TranslateService) { }

  ngOnInit(): void {
    this.getAppSettings();
  }

  getAppSettings(){
    debugger;
    this.baseService.getAppSettings().subscribe(res =>{
      this.appSettings = res as AppSettings;
      console.log(this.appSettings)
    })
  }

}
