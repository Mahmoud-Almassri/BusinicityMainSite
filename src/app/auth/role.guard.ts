import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { AuthorizeServiceService } from './authorize-service.service';
@Injectable()
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthorizeServiceService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem(environment.token);
    // decode the token to get its payload
    if(token){
      var tokenPayload = decode(token);
    }
    else {
      this.router.navigate(['/auth/login']);
      return false;
    }
    if (
        !this.auth.isAuthenticated() ||
      Array.isArray((tokenPayload as any)[environment.roleClaim])
      ? !((tokenPayload as any)[environment.roleClaim].find(x => x === expectedRole.find(r=>r==x)))
      :  (tokenPayload as any)[environment.roleClaim] !== expectedRole.find(r=>r==(tokenPayload as any)[environment.roleClaim])
    ) {
      console.log((tokenPayload as any)[environment.roleClaim])
      console.log(this.auth.isAuthenticated());
      console.log(expectedRole);
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}