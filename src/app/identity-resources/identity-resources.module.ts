import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityResourcesRoutingModule } from './identity-resources-routing.module';
import { IdentityResourceComponent } from './identity-resource.component';
import { IdentityResourceAddModalComponent } from './identity-resource-add-modal/identity-resource-add-modal.component';
import { IdentityResourceEditComponent } from './identity-resource-edit/identity-resource-edit.component';
import { IdentityResourceListComponent } from './identity-resource-list/identity-resource-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    IdentityResourcesRoutingModule
  ],
  declarations: [IdentityResourceComponent, IdentityResourceAddModalComponent, IdentityResourceEditComponent, IdentityResourceListComponent]
})
export class IdentityResourcesModule { }
