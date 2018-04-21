import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Role } from '../../core/model/roles.model';
import { RolesService } from '../../core/services/roles/roles.service';
import { CommonService, ToastrServiceProvider } from '../../core/services/index';


@Component({
  selector: 'authority-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.sass']
})
export class RoleEditComponent implements OnInit {

  role: Role;
  roleForm: FormGroup;

  @Output() updatedRole: EventEmitter<Role> = new EventEmitter<Role>();
  @Output() deletedRole: EventEmitter<Role> = new EventEmitter<Role>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _rolesService: RolesService
  ) { }

  ngOnInit() {
    this.roleForm = this.buildRole(this.newRole());
  }

  /**
   * ON ROLE SELECT FROM LIST COMPONANT.
   * @param role 
   */
  onRoleSelect(role: Role) {
    this._rolesService.getRole(role.Id).subscribe(
      response => {
        if (response.status) {
          this.role = response.result;
          this.roleForm = this.buildRole(this.role);
        } else {
          this._toast.error(response.message);
        }
      }, err => {
        this._toast.error(err.errors);
      }
    )
  }

  /**
   * UPDATE & EMIT DATA.
   */
  updateRole() {
    let updatedRole = Object.assign({}, this.role, this.roleForm.getRawValue);

    let validate = this._common.validateAllFormFields(this.roleForm);
    if (validate.result) {

      this._rolesService.saveRole(this.role.Id, updatedRole).subscribe(
        response => {
          if (response.status) {
            this._toast.success(response.message);
            this.updatedRole.emit(updatedRole);
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
   * DELETE & EMIT ROLE
   */
  deleteRole() {
    this._common.confirmBox('Are you sure you want to delete this role?').subscribe(result => {
      let confirm = result;

      if (confirm) {
        this._rolesService.deleteRole(this.role.Id).subscribe(
          response => {
            if (response.status) {
              this._toast.success(response.message, 'Success');
              this.deletedRole.emit(this.role);
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
   * GET EMPTY ROLE
   */
  newRole(): Role {
    return {
      Id: null,
      Name: null,
      Description: null
    }
  }

  /**
   * BUILD ROLE FORM GROUP
   * @param data 
   */
  buildRole(data: Role): FormGroup {
    return this._fb.group({
      Id: [data.Id, Validators.required],
      Name: [data.Name, Validators.required],
      Description: [data.Description]
    })
  }

}
