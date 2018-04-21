import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { UserManager, User, UserManagerSettings, Log } from 'oidc-client';
import { Subject } from 'rxjs/Subject';

const settings: UserManagerSettings = {
  authority: 'http://192.168.0.62:8081/',
  client_id: '1TrakIt',
  redirect_uri: 'http://localhost:4200/signin-callback.html',
  post_logout_redirect_uri: 'http://localhost:4200/',
  response_type: 'id_token token',
  scope: 'openid profile',

  silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
  automaticSilentRenew: true,
  accessTokenExpiringNotificationTime: 4,
  // silentRequestTimeout:10000,

  filterProtocolClaims: true,
  loadUserInfo: true
};

@Injectable()
export class AuthService {

  manager: UserManager = new UserManager(settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  currentUserData = new Subject<object>();
  loggedIn = false;

  constructor(private _http: HttpClient) {
    this.manager.getUser()
      .then(user => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.currentUserData.next(this.currentUser.profile);
          this.userLoadededEvent.emit(user);
        }
        else {
          this.loggedIn = false;
        }
      }).catch((err) => {
        this.loggedIn = false;
      });

    this.manager.events.addUserLoaded((user) => {
      this.currentUser = user;
      this.currentUserData.next(this.currentUser.profile);
      console.log('authService addUserLoaded', user);
    });

    this.manager.events.addUserUnloaded((e) => {
      console.log('user unloaded');
      this.loggedIn = false;
    });

  }

  isLoggedInObs(): Observable<boolean> {
    return Observable.fromPromise(this.manager.getUser()).map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }

  startSigninMainWindow() {
    this.manager.signinRedirect({ data: 'some data' }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }
  endSigninMainWindow() {
    this.manager.signinRedirectCallback().then(function (user) {
      console.log('signed in', user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  startSignoutMainWindow() {
    this.manager.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
      setTimeout(5000, () => {
        console.log('testing to see if fired...');

      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  endSignoutMainWindow() {
    this.manager.signoutRedirectCallback().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err);
    });
  }

  getUser() {
    this.manager.getUser().then((user) => {
      this.currentUser = user;
      this.currentUserData.next(this.currentUser.profile);
      console.log('got user', user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }
  getUserData(){
    return this.currentUserData.asObservable();
  }

}
