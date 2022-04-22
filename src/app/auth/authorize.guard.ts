import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthorizeServiceService } from './authorize-service.service';

@Injectable()
export class AuthorizeGuard implements CanActivate{
    constructor(public auth: AuthorizeServiceService, public router: Router) {
    }

    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }
}