import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { SharedModule } from '../shared/shared.module';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleAddModalComponent } from './role-add-modal/role-add-modal.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RolesRoutingModule
  ],
  declarations: [RoleComponent, RoleListComponent, RoleEditComponent, RoleAddModalComponent],
  entryComponents: [RoleAddModalComponent]
})
export class RolesModule { }
