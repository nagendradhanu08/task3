import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ProtectedResource } from '../core/model/ProtectedResource.model';
import { ProtectedResourcesService } from '../core/services/protected-resources/protected-resources.service';
import { ProtectedResourceAddModalComponent } from './protected-resource-add-modal/protected-resource-add-modal.component';
@Component({
  selector: 'authority-protected-resource',
  templateUrl: './protected-resource.component.html',
  styleUrls: ['./protected-resource.component.sass']
})
export class ProtectedResourceComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  /**
   * SHOW MODAL.
   */
  showModal() {
    this.modalRef = this.modalService.show(ProtectedResourceAddModalComponent);
  }
  

}
