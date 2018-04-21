import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  declarations: [SearchPipePipe],
  providers: [SearchPipePipe],
  exports: [FormsModule, ReactiveFormsModule, SearchPipePipe]
})

export class SharedModule { }
