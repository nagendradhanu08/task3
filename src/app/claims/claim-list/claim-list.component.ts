
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Claim } from '../../core/model/claims.model';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { ToastrServiceProvider, ClaimsService } from '../../core/services/index';

@Component({
  selector: 'authority-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.sass']
})
export class ClaimListComponent implements OnInit, AfterViewInit {

  activeClaimId: string;
  _searchText: string;
  _claims: Claim[] = [];
  claim: Claim;
  filteredClaims: Claim[] = [];

  @Output() selectedClaim: EventEmitter<Claim> = new EventEmitter<Claim>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _claimsService: ClaimsService,
    private searchPipe: SearchPipePipe
  ) {
    this._claimsService.newClaimData$.subscribe(newClaim => {
      this.onNewClaimAdd(newClaim);
    })
  }

  // GETTERS & SETTERS - CLAIMS.
  get claims() {
    return this._claims;
  }
  set claims(claims: Claim[]) {
    this._claims = claims;
    this.filteredClaims = this._claims;
  }

  // GETTERS & SETTERS - SEARCH TEXT.
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;

    //FILTER LIST WITH SEARCH TEXT.
    this.filteredClaims = this.searchText ? this.searchPipe.transform(this.claims, this.searchText) : this.claims;
  }


  ngOnInit() {
    this._claimsService.getClaims().subscribe(
      response => {
        if (response.status) {
          this.claims = response.result;
          this.selectClaim(this.filteredClaims[0]);
        } else {
          this._toast.error('something went wrong.', 'Error');
        }
      }, err => {
        this._toast.error(err.error, 'Error');
      }
    );
  }
  ngAfterViewInit() {
    if (this.filteredClaims.length > 0) {
      this.selectClaim(this.filteredClaims[0]);
    }
  }

  /**
   * SELECT & EMIT CLAIM TO EDIT FORM.
   * @param claim 
   */
  selectClaim(claim: Claim) {
    this.activeClaimId = claim.Id;
    this.claim = claim;
    this.selectedClaim.emit(claim);
  }

  /**
   * ON CLAIM UPDATE FROM CLAIM-EDIT COMPONANT.
   * @param claim 
   */
  onClaimUpdate(claim: Claim) {
    let index = this.claims.indexOf(this.claim);

    this.claims[index] = Object.assign(this.claim, claim);
    this.selectClaim(this.claims[index]);
  }

  /**
   * ON CLAIM DELETE FROM CLAIM-EDIT COMPONANT.
   * @param claim 
   */
  onClaimDelete(claim: Claim) {
    let index = this.claims.indexOf(this.claim);

    this.claims.splice(index, 1);

    if (this.claims[index]) {
      this.selectClaim(this.claims[index]);
    } else if (this.claims[index - 1]) {
      this.selectClaim(this.claims[index - 1]);
    } else {
      this.selectClaim(this.newClaim());
    }
    // this.selectClaim(this.filteredClaims[0]);
  }

  /**
   * ON NEW CLAIM ADDED FORM CLAIM-ADD-MODAL COMPONANT.
   * @param claim 
   */
  onNewClaimAdd(claim: Claim) {
    let newClaimData = Object.assign({}, claim);

    this.claims.push(newClaimData);
    this.searchText = this.searchText;

    this.selectClaim(newClaimData);
  }

  /**
   * GET EMPTY CLAIM.
   */
  newClaim(): Claim {
    return {
      Id: null,
      Type:null,
      Name: null,
      Description: null,
      IsRequired:null
    }
  }

}
