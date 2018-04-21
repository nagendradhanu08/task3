import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedResourceComponent } from './protected-resource.component';
const routes: Routes = [
  { path: '', component: ProtectedResourceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedResourcesRoutingModule { }
