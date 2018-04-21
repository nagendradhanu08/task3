import { Component, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


import { Role } from '../../core/model/roles.model';
import { RolesService } from '../../core/services/roles/roles.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CommonService } from '../../core/services/common/common.service';
import { ToastrServiceProvider } from '../../core/services/index';

@Component({
  selector: 'authority-role-add-modal',
  templateUrl: './role-add-modal.component.html',
  styleUrls: ['./role-add-modal.component.sass']
})
export class RoleAddModalComponent implements OnInit {

  role: Role;
  roleForm: FormGroup;

  @Output() newRole: EventEmitter<Role> = new EventEmitter<Role>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _rolesService: RolesService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
    //INITIALIZE FORM FOR FIRST TIME.
    this.roleForm = this.buildRole(this.emptyRole());
  }

  /**
   * CLEAR FORM DATA.
   */
  clearForm() {
    this.roleForm.reset();
  }

  /**
   * CANCEL ADD FORM MODAL.
   */
  cancelAdd() {
    this.roleForm = this.buildRole(this.emptyRole());
  }

  /**
   * ADD & EMIT NEW ROLE DATA.
   */
  addRole() {
    let newRoleData = this.roleForm.value;

    let validate = this._common.validateAllFormFields(this.roleForm);
    if (validate.result) {

      this._rolesService.createRole(newRoleData).subscribe(
        response => {
          if (response.status) {
            this._toast.success(response.message, 'Success');
            this._rolesService.sendNewRoleData(response.result);
            // this.newRole.emit(response.result);
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
   * TO GET EMPTY ROLE DATA.
   */
  emptyRole(): Role {
    return {
      Id: null,
      Name: null,
      Description: null
    }
  }

  /**
   * BUILD FORM GROUP FOR ROLE DATA.
   * @param data 
   */
  buildRole(data: Role): FormGroup {
    return this._fb.group({
      // Id: [data.id, Validators.required],
      Name: [data.Name, [Validators.required]],
      Description: [data.Description]
    })
  }

}
