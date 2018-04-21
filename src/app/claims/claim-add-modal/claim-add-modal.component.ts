
import { Component, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


import { Claim } from '../../core/model/claims.model';
import { ClaimsService } from '../../core/services/claims/claims.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommonService } from '../../core/services/common/common.service';
import { ToastrServiceProvider } from '../../core/services/index';

@Component({
  selector: 'authority-claim-add-modal',
  templateUrl: './claim-add-modal.component.html',
  styleUrls: ['./claim-add-modal.component.sass']
})
export class ClaimAddModalComponent implements OnInit {

  claim: Claim;
  claimForm: FormGroup;
  Types :any = [];
  
  @Output() newClaim: EventEmitter<Claim> = new EventEmitter<Claim>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _claimsService: ClaimsService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
    //INITIALIZE FORM FOR FIRST TIME.
    this.claimForm = this.buildClaim(this.emptyClaim());
    this.Types= this._common.getClaimTypes();
  }

  /**
   * CLEAR FORM DATA.
   */
  clearForm() {
    this.claimForm.reset();
  }

  /**
   * CANCEL ADD FORM MODAL.
   */
  cancelAdd() {
    this.claimForm = this.buildClaim(this.emptyClaim());
  }

  /**
   * ADD & EMIT NEW CLAIM DATA.
   */
  addClaim() {
    let newClaimData = this.claimForm.value;
    console.log(this.claimForm.value);
    let validate = this._common.validateAllFormFields(this.claimForm);
    if (validate.result) {

      this._claimsService.createClaim(newClaimData).subscribe(
        response => {
          if (response.status) {
            this._toast.success(response.message, 'Success');
            this._claimsService.sendNewClaimData(response.result);
            // this.newClaim.emit(response.result);
            this.modalRef.hide();
          } else {
            this._toast.error(response.errors, 'Error');
          }
        }, err => {
          this._toast.error(err.errors, 'Error');
        });
      this.clearForm();
    } else {
      this._toast.error(validate.errors, 'Error')
    }
  }

  /**
   * TO GET EMPTY CLAIM DATA.
   */
  emptyClaim(): Claim {
    return {
      Id: null,
      Type:null,
      Name: null,
      Description: null,
      IsRequired:null
    }
  }

  /**
   * BUILD FORM GROUP FOR CLAIM DATA.
   * @param data 
   */
  buildClaim(data: Claim): FormGroup {
    return this._fb.group({
      // Id: [data.Id, Validators.required],
      Type: [data.Type, Validators.required],
      Name: [data.Name, Validators.required],
      Description: [data.Description, Validators.required ],
      IsRequired: [data.IsRequired, Validators.required ] 
    })
  }

}

