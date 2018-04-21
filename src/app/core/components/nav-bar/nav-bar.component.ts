import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';

@Component({
  selector: 'authority-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  userData: any;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getUserData().subscribe(
      response => {
        this.userData = response;
      }
    );
  }

  logout(){
    this._authService.startSignoutMainWindow();
  }

}
