import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizeServiceService } from 'src/app/auth/authorize-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public isLoggedInUser: boolean = false;
  public nameIdentifier
  public loggedInUserName: string;

  public dir = 'ltr'

  constructor(
    private translate: TranslateService,
    private auth: AuthorizeServiceService) { }

  ngOnInit(): void {
    this.isLoggedInUser = this.auth.isAuthenticated();
    if (this.isLoggedInUser) {
      var decodedToken = this.auth.getDecodedAccessToken(this.auth.getToken());
      console.log(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      this.loggedInUserName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
  }

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    console.log('collapsed');

  }
  toggleLanguage() {
    this.toggleCollapsed();
    const currentLang = this.translate.currentLang
    currentLang == 'EN' ? this.translate.use('AR') : this.translate.use('EN')
    currentLang == 'EN' ? this.dir = "rtl" : this.dir = "ltr";
  }
  logout() {
    this.toggleCollapsed();
    this.auth.logout();
  }
}
