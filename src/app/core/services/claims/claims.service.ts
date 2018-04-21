import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { Claim } from '../../model/claims.model';
import { Response } from '../../model/response.model';
import { environment } from '../../../../environments/environment';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ClaimsService {
  baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  //NEW CLAIM DATA TO BE PUSHED IN LIST - OBSERVABLE.
  private newClaimDataSource = new Subject<Claim>();
  newClaimData$ = this.newClaimDataSource.asObservable();

  sendNewClaimData(claimData: Claim) {
    this.newClaimDataSource.next(claimData);
  }
  getNewClaimData(): Observable<Claim> {
    return this.newClaimData$;
  }

 //GET ALL CLAIMS.
 getClaims(): Observable<Response> {
  // return this.claims;
  return this._http.get<Response>(this.baseUrl + `claimstype`)
    // .do(data => console.log('getClaims: ' + JSON.stringify(data)))
    .catch(this.handleError);
}

//GET CLAIM DATA.
getClaim(Id): Observable<Response> {
  return this._http.get<Response>(this.baseUrl + `claimstype/${Id}`)
    // .do(data => console.log('getClaimDetail: ' + JSON.stringify(data)))
    .catch(this.handleError);
}

//ADD CLAIM.
createClaim(claim: Claim): Observable<Response> {
  return this._http.post<Response>(this.baseUrl + `claimstype`, claim)
    // .do(data => console.log('createClaim: ' + JSON.stringify(data)))
    .catch(this.handleError);
}

//EDIT CLAIM.
saveClaim(Id: string, claim: Claim): Observable<Response> {
  return this._http.put<Response>(this.baseUrl + `claimstype/${Id}`, claim)
    // .do(data => console.log('saveClaim: ' + JSON.stringify(data)))
    .catch(this.handleError);
}

//DELETE CLAIM.
deleteClaim(Id: string): Observable<Response> {
  return this._http.delete<Response>(this.baseUrl + `removeclaimstype/${Id}`)
    // .do(data => console.log('DeleteClaim: ' + JSON.stringify(data)))
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
