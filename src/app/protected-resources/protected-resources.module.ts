import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedResourcesRoutingModule } from './protected-resources-routing.module';
import { ProtectedResourceComponent } from './protected-resource.component';
import { ProtectedResourceListComponent } from './protected-resource-list/protected-resource-list.component';
import { ProtectedResourceEditComponent } from './protected-resource-edit/protected-resource-edit.component';
import { ProtectedResourceAddModalComponent } from './protected-resource-add-modal/protected-resource-add-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ProtectedResourcesRoutingModule
  ],
  declarations: [ProtectedResourceComponent, ProtectedResourceListComponent, ProtectedResourceEditComponent, ProtectedResourceAddModalComponent]
})
export class ProtectedResourcesModule { }
