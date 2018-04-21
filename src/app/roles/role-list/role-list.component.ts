import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Role } from '../../core/model/roles.model';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { ToastrServiceProvider, RolesService } from '../../core/services/index';

@Component({
  selector: 'authority-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.sass']
})
export class RoleListComponent implements OnInit, AfterViewInit {

  activeRoleId: string;
  _searchText: string;
  _roles: Role[] = [];
  role: Role;
  filteredRoles: Role[] = [];

  @Output() selectedRole: EventEmitter<Role> = new EventEmitter<Role>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _rolesService: RolesService,
    private searchPipe: SearchPipePipe
  ) {
    this._rolesService.newRoleData$.subscribe(newRole => {
      this.onNewRoleAdd(newRole);
    })
  }

  // GETTERS & SETTERS - ROLES.
  get roles() {
    return this._roles;
  }
  set roles(roles: Role[]) {
    this._roles = roles;
    this.filteredRoles = this._roles;
  }

  // GETTERS & SETTERS - SEARCH TEXT.
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;

    //FILTER LIST WITH SEARCH TEXT.
    this.filteredRoles = this.searchText ? this.searchPipe.transform(this.roles, this.searchText) : this.roles;
  }


  ngOnInit() {
    this._rolesService.getRoles().subscribe(
      response => {
        if (response.status) {
          this.roles = response.result;
          // this.selectRole(this.filteredRoles[0]);
        } else {
          this._toast.error('something went wrong.', 'Error');
        }
      }, err => {
        this._toast.error(err.error, 'Error');
      }
    );
  }
  ngAfterViewInit() {
    if (this.filteredRoles.length > 0) {
      this.selectRole(this.filteredRoles[0]);
    }
  }

  /**
   * SELECT & EMIT ROLE TO EDIT FORM.
   * @param role 
   */
  selectRole(role: Role) {
    this.activeRoleId = role.Id;
    this.role = role;
    this.selectedRole.emit(role);
  }

  /**
   * ON ROLE UPDATE FROM ROLE-EDIT COMPONANT.
   * @param role 
   */
  onRoleUpdate(role: Role) {
    let index = this.roles.indexOf(this.role);

    this.roles[index] = Object.assign(this.role, role);
    this.selectRole(this.roles[index]);
  }

  /**
   * ON ROLE DELETE FROM ROLE-EDIT COMPONANT.
   * @param role 
   */
  onRoleDelete(role: Role) {
    let index = this.roles.indexOf(this.role);

    this.roles.splice(index, 1);

    if (this.roles[index]) {
      this.selectRole(this.roles[index]);
    } else if (this.roles[index - 1]) {
      this.selectRole(this.roles[index - 1]);
    } else {
      this.selectRole(this.newRole());
    }
    // this.selectRole(this.filteredRoles[0]);
  }

  /**
   * ON NEW ROLE ADDED FORM ROLE-ADD-MODAL COMPONANT.
   * @param role 
   */
  onNewRoleAdd(role: Role) {
    let newRoleData = Object.assign({}, role);

    this.roles.push(newRoleData);
    this.searchText = this.searchText;

    this.selectRole(newRoleData);
  }

  /**
   * GET EMPTY ROLE.
   */
  newRole(): Role {
    return {
      Id: null,
      Name: null,
      Description: null
    }
  }

}
