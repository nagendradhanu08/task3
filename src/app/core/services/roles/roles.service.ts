import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Role } from '../../model/roles.model';
import { Response } from '../../model/response.model';
import { environment } from '../../../../environments/environment';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RolesService {
  baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  //NEW ROLE DATA TO BE PUSHED IN LIST - OBSERVABLE.
  private newRoleDataSource = new Subject<Role>();
  newRoleData$ = this.newRoleDataSource.asObservable();

  sendNewRoleData(roleData: Role) {
    this.newRoleDataSource.next(roleData);
  }
  getNewRoleData(): Observable<Role> {
    return this.newRoleData$;
  }


  //GET ALL ROLES.
  getRoles(): Observable<Response> {
    // return this.roles;
    return this._http.get<Response>(this.baseUrl + `roles`)
      // .do(data => console.log('getRoles: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //GET ROLE DATA.
  getRole(Id): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + `roles/${Id}`)
      // .do(data => console.log('getRoleDetail: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //ADD ROLE.
  createRole(role: Role): Observable<Response> {
    return this._http.post<Response>(this.baseUrl + `roles`, role)
      // .do(data => console.log('createRole: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //EDIT ROLE.
  saveRole(Id: string, role: Role): Observable<Response> {
    return this._http.put<Response>(this.baseUrl + `roles/${Id}`, role)
      // .do(data => console.log('saveRole: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //DELETE ROLE.
  deleteRole(Id: string): Observable<Response> {
    return this._http.delete<Response>(this.baseUrl + `role/${Id}`)
      // .do(data => console.log('DeleteRole: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  /**
   * HANDLE ERROR
   * @param error
   */
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
