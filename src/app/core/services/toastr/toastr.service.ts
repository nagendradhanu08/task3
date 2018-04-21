import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class ToastrServiceProvider {

  constructor(private _toastrService: ToastrService) { }

  //CONVERT TO UN ORDERED LIST IF ARRAY.
  protected convertToList(message: any) {
    if (message instanceof Array) {

      let list: string = `<ul>`;
      message.forEach(element => {
        list += `<li>${element}</li>`;
      });
      list += `</ul>`;
      return list;
    } else {
      return message;
    }
  }

  //SHOW MESSAGE/S
  show(errors?: any[] | string, title?: string) {
    this._toastrService.show(this.convertToList(errors), title);
  }

  //SHOW SUCCESS MESSAGE/S
  success(errors?: any[] | string, title: string = 'Success') {
    this._toastrService.success(this.convertToList(errors), title);
  }

  //SHOW ERROR MESSAGE/S
  error(errors?: any[] | string, title: string = 'Error') {
    this._toastrService.error(this.convertToList(errors), title);
  }

  //SHOW INFORMATION/S
  info(errors?: any[] | string, title: string = 'Note') {
    this._toastrService.info(this.convertToList(errors), title);
  }

  //SHOW WARNING/S
  warning(errors?: any[] | string, title: string = 'Warning') {
    this._toastrService.warning(this.convertToList(errors), title);
  }

}
