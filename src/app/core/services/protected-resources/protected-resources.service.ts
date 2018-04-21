import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '../../model/response.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ProtectedResource } from '../../model/ProtectedResource.model';

@Injectable()
export class ProtectedResourcesService {
  baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  //GET ALL PROTECTED RESOURCE RESOURCES.
  getProtectedResources(): Observable<Response> {
    // return this.protectedResources;
    return this._http.get<Response>(this.baseUrl + `apiresources`)
      // .do(data => console.log('getProtectedResources: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //GET PROTECTED RESOURCE DATA.
  getProtectedResource(Id): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + `apiresources/${Id}`)
      // .do(data => console.log('getProtectedResourceDetail: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //ADD PROTECTED RESOURCE.
  createProtectedResource(protectedResource: ProtectedResource): Observable<Response> {
    return this._http.post<Response>(this.baseUrl + `apiresources`, protectedResource)
      // .do(data => console.log('createProtectedResource: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //EDIT PROTECTED RESOURCE.
  saveProtectedResource(Id: string, protectedResource: ProtectedResource): Observable<Response> {
    return this._http.put<Response>(this.baseUrl + `apiresources/${Id}`, protectedResource)
      // .do(data => console.log('saveProtectedResource: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //DELETE PROTECTED RESOURCE.
  deleteProtectedResource(Id: string): Observable<Response> {
    return this._http.delete<Response>(this.baseUrl + `apiresources/${Id}`)
      // .do(data => console.log('DeleteProtectedResource: ' + JSON.stringify(data)))
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
