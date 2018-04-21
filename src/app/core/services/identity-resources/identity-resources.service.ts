import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '../../model/response.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { IdentityResource } from '../../model/IdentityResource.model';

@Injectable()
export class IdentityResourcesService {
  baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  //GET ALL IDENTITY RESOURCES.
  getIdentityResources(): Observable<Response> {
    // return this.identityResources;
    return this._http.get<Response>(this.baseUrl + `identityresources`)
      // .do(data => console.log('getIdentityResources: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //GET IDENTITY RESOURCE DATA.
  getIdentityResource(Id): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + `identityresources/${Id}`)
      // .do(data => console.log('getIdentityResourceDetail: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //ADD IDENTITY RESOURCE.
  createIdentityResource(identityResource: IdentityResource): Observable<Response> {
    return this._http.post<Response>(this.baseUrl + `identityresources`, identityResource)
      // .do(data => console.log('createIdentityResource: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //EDIT IDENTITY RESOURCE.
  saveIdentityResource(Id: string, identityResource: IdentityResource): Observable<Response> {
    return this._http.put<Response>(this.baseUrl + `identityresources/${Id}`, identityResource)
      // .do(data => console.log('saveIdentityResource: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //DELETE IDENTITY RESOURCE.
  deleteIdentityResource(Id: string): Observable<Response> {
    return this._http.delete<Response>(this.baseUrl + `identityresource/${Id}`)
      // .do(data => console.log('DeleteIdentityResource: ' + JSON.stringify(data)))
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
