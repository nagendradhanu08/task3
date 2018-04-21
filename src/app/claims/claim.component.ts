import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Claim } from '../core/model/claims.model';
import { ClaimsService } from '../core/services/claims/claims.service';
import { ClaimAddModalComponent } from './claim-add-modal/claim-add-modal.component';

@Component({
  selector: 'authority-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.sass']
})
export class ClaimComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

   /**
   * SHOW MODAL.
   */
  showModal() {
    this.modalRef = this.modalService.show(ClaimAddModalComponent);
  }

}
