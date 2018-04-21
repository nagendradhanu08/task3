import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/index';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  /**
   * ROUTE GUARD FOR AUTHENTICATION
   */
  canActivate() {
    let loggedIn = this._authService.isLoggedInObs();
    loggedIn.subscribe(
      loggedin => {
        if (!loggedin) {
          // this._router.navigate(['123'])
          this._authService.startSigninMainWindow();
        }
      }
    )
    return loggedIn;
  }


}
