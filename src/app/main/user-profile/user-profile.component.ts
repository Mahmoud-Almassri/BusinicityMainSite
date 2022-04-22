import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizeServiceService } from 'src/app/auth/authorize-service.service';
import { Controllers } from 'src/app/shared/global-variables/api-config';
import { PersonJob, WebPerson } from 'src/app/shared/models/objectmodels';
import { BaseServiceService } from 'src/app/shared/services/base-service.service';
import { NotificationServiceService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public isLoggedInUser : boolean = false
  public personId
  public jobTitle :PersonJob[]
  public personForm=new FormGroup({
    firstName:new FormControl(),
    lastName:new FormControl(),
    secondName:new FormControl(),
    thirdName:new FormControl(),
    gender:new FormControl(),
    mobileNo:new FormControl(),
    personalEmail:new FormControl(),
  })
  constructor(
    public notification:NotificationServiceService,
    private activated:ActivatedRoute,
    private baseService:BaseServiceService ,
    private auth:AuthorizeServiceService,
    public spinner : NgxSpinnerService,
    public translate:TranslateService) { }

  ngOnInit(): void {
this.spinner.show();
    this.isLoggedInUser = this.auth.isAuthenticated();
    var token = this.auth.loggedInUser
    var decodedToken = this.auth.getDecodedAccessToken(token)
    this.personId= decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
      this.getUserProfile()

  }

  public getUserProfile(){
    if(this.isLoggedInUser && this.personId){
      this.baseService.getPersonById(this.personId).subscribe(res =>{
        this.spinner.hide()
        this.personForm.patchValue(res as WebPerson)
        this.jobTitle = (res as WebPerson).personJob
        console.log(res as any)
      },error=>{
        this.spinner.hide()
        this.notification.showNotification(
          this.translate.currentLang == 'EN' ? 'User Profile' : 'الملف الشخصي',
          this.translate.currentLang == 'EN' ? 'Something went wrong' : 'هناك خطأ ما',
          'error'
        );
      })
    }
    else{
      this.notification.showNotification(
        this.translate.currentLang == 'EN' ? 'User Profile' : 'الملف الشخصي',
        this.translate.currentLang == 'EN' ? 'User Not Logged In' : 'المستخدم لم يسجل الدخول',
        'error'
      );
    }

  }

}
