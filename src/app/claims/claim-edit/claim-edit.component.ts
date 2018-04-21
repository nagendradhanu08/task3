
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

import { Claim } from '../../core/model/claims.model';
import { ClaimsService } from '../../core/services/claims/claims.service';
import { CommonService, ToastrServiceProvider } from '../../core/services/index';


@Component({
  selector: 'authority-claim-edit',
  templateUrl: './claim-edit.component.html',
  styleUrls: ['./claim-edit.component.sass']
})
export class ClaimEditComponent implements OnInit {

  showForm: boolean = true;
  claim: Claim;
  claimForm: FormGroup;
  Types :any = [];

  @Output() updatedClaim: EventEmitter<Claim> = new EventEmitter<Claim>();
  @Output() deletedClaim: EventEmitter<Claim> = new EventEmitter<Claim>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _claimsService: ClaimsService
  ) { }

  ngOnInit() {
    this.claimForm = this.buildClaim(this.newClaim());
    this.Types= this._common.getClaimTypes();
  }

  /**
   * ON CLAIM SELECT FROM LIST COMPONANT.
   * @param claim 
   */
  onClaimSelect(claim: Claim) {
    this._claimsService.getClaim(claim.Id).subscribe(
      response => {
        if (response.status) {
          this.claim = response.result;
          this.claimForm = this.buildClaim(this.claim);
        } else {
          this._toast.error(response.message);
        }
      }, err => {

      }
    )
  }

  /**
   * UPDATE & EMIT DATA.
   */
  updateClaim() {
    let updatedClaim = Object.assign({}, this.claim, this.claimForm.value);
    let validate = this._common.validateAllFormFields(this.claimForm);
    if (validate.result) {

      this._claimsService.saveClaim(this.claim.Id, updatedClaim).subscribe(
        response => {
          if (response.status) {
            this._toast.success(response.message);
            this.updatedClaim.emit(updatedClaim);
          } else {
            this._toast.error(response.errors);
          }
        }, err => {
          this._toast.error(err.errors, 'Error');
        }
      );

    } else {
      this._toast.error(validate.errors, 'Error');
    }
  }

  /**
   * DELETE & EMIT CLAIM
   */
  deleteClaim() {
    this._common.confirmBox('Are you sure you want to delete this CLAIM?').subscribe(result => {
      let confirm = result;

      if (confirm) {
        this._claimsService.deleteClaim(this.claim.Id).subscribe(
          response => {
            if (response.status) {
              this._toast.success(response.message, 'Success');
              this.deletedClaim.emit(this.claim);
            } else {
              this._toast.error(response.message, 'Error');
            }
          }, err => {
            this._toast.error(err.errors, 'Failed');
          }
        );
      }

    });
  }

  /**
   * GET EMPTY CLAIM
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

  /**
   * BUILD CLAIM FORM GROUP
   * @param data 
   */
  buildClaim(data: Claim): FormGroup {
    return this._fb.group({
      Id: [data.Id, Validators.required],
      Type: [data.Type, Validators.required],
      Name: [data.Name, Validators.required],
      Description: [data.Description, Validators.required ],
      IsRequired: [data.IsRequired, Validators.required ] 
    })
  }

}

