import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthInterceptor } from './services/auth/auth.interceptor';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CommonService, RolesService, ToastrServiceProvider, AuthService, IdentityResourcesService, ClaimsService, ProtectedResourcesService } from './services/index';

import { ToastrModule } from 'ngx-toastr';
// import { ModalModule } from 'ngx-bootstrap';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      enableHtml: true,
      // disableTimeOut: true
    })
  ],
  declarations: [NavBarComponent, SideBarComponent, ConfirmModalComponent],
  providers: [AuthGuardService, AuthService, CommonService, ToastrServiceProvider, RolesService, IdentityResourcesService, ClaimsService, ProtectedResourcesService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
  ],
  exports: [NavBarComponent, SideBarComponent],
  entryComponents: [ConfirmModalComponent]
})
export class CoreModule { }
