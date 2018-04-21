import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Role } from '../core/model/roles.model';
import { RolesService } from '../core/services/roles/roles.service';
import { RoleAddModalComponent } from './role-add-modal/role-add-modal.component';

@Component({
  selector: 'authority-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass']
})
export class RoleComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {}


  /**
   * SHOW MODAL.
   */
  showModal() {
    this.modalRef = this.modalService.show(RoleAddModalComponent);
  }

}
