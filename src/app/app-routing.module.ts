import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'roles',
    loadChildren: 'app/roles/roles.module#RolesModule',
    data: { breadcrumb: "roles" },
    canActivate: [AuthGuardService]
  },
  {
    path: 'identity-resources',
    loadChildren: 'app/identity-resources/identity-resources.module#IdentityResourcesModule',
    data: { breadcrumb: "Identity Resources" },
    canActivate: [AuthGuardService]
  },
  {
    path: 'claims',
    loadChildren: 'app/claims/claims.module#ClaimsModule',
    data: { breadcrumb: "claims" },
    canActivate: [AuthGuardService]
  },
  {
    path: 'protected-resources',
    loadChildren: 'app/protected-resources/protected-resources.module#ProtectedResourcesModule',
    data: { breadcrumb: "Protected Resources" },
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'identity-resources'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
