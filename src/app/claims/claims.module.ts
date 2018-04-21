import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimComponent } from './claim.component';
import { SharedModule } from '../shared/shared.module';
import { ClaimAddModalComponent } from './claim-add-modal/claim-add-modal.component';
import { ClaimEditComponent } from './claim-edit/claim-edit.component';
import { ClaimListComponent } from './claim-list/claim-list.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ClaimsRoutingModule
  ],
  declarations: [ClaimComponent, ClaimAddModalComponent, ClaimEditComponent, ClaimListComponent],
  entryComponents: [ClaimAddModalComponent]
})
export class ClaimsModule { }
