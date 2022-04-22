import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import jwt_decode from 'jwt-decode';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class AuthorizeServiceService {

  constructor(public jwtHelper: JwtHelperService, private router: Router,private http: HttpClient) {}

    public isAuthenticated(): boolean {
        const token = localStorage.getItem(environment.token);
        // Check whether the token is expired and return
        // true or false
        if (token){
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;
      }

    /**
     * setToken
     */
    // tslint:disable-next-line: typedef
    public setToken(token: string) {
        localStorage.setItem(environment.token, token);
    }
    public getToken() {
       return localStorage.getItem(environment.token);
    }

    public logout(){
        localStorage.removeItem(environment.token);
        this.router.navigate(['/auth/login']);
    }
    public signInWithGoogle = ()=> {
      //return this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    public signInWithLinkedin() {
      //return this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    public signOutExternal = () => {
      //this.externalAuthService.signOut();
    }
    public externalLogin = (route: string, body: any) => {
      return this.http.post<any>(route, body);
    }
    linkedinSignup() {
      this.http
        .get('https://www.linkedin.com/oauth/v2/authorization', {
          params: {
            response_type: 'code',
            client_id: '774vcd5c0giryx',
            redirect_uri: 'https%3A%2F%2Flocalhost%3A44356%2Fsignin-linkedin',
            client_secret:'c3o4aLOJ5Pmwt7pD',
            state:'CfDJ8NJlvMPoX4ZMp8JZ8nraCxZ6g4KsFrAeGD_Bc2i5jy8aCSIX9Wh20KLG1Zwd5qKLY5AOMQ0uZhLUwaf4lOPwf0r-iTlKaHTm2-J_xS9m5QN6tCrxrqp7iTljRkySDNPr8okGoaY-93F3cDQWl_v8k8aoTVPFonPsdw0S4p_U15apFkp7w--11-KYOympi5SeOvzEFnqkHnjr7L9zA9-mAvwiYyimRb6YOT88gdN8q1zgP-622IxXdtd1hm8zonBETUJYf_ldq4gN2qCHuwR8gyY',
            scope: 'r_liteprofile r_emailaddress',
          },
        })
        .toPromise();
      console.log('Hit');
      window.open(
        'https://localhost:44356/signin-linkedin',
        'LinkedIn Login',
        `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  width=0,height=0,left=-1000,top=-1000`
      );
    }
    get loggedInUser(): string {
        const token = localStorage.getItem(environment.token);
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return token;
        }
        return null;
    }


    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }
}
