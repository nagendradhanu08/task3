import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonService {

  constructor(private _bsModalService: BsModalService) { }

  /**
   * CONFIRM BOX WITH DYNAMIC MESSAGE.
   * @param message 
   */
  confirmBox(message: string = 'Are you sure?'): Observable<boolean> {
    let confirmBoxFlag = new Subject<boolean>();

    const modal = this._bsModalService.show(ConfirmModalComponent, { class: 'modal-sm' });

    (modal.content).showConfirmationModal(message);
    (modal.content).onClose.subscribe(
      result => {
        confirmBoxFlag.next(result);
      });

    return confirmBoxFlag;
  }

  /**
   * FORM VALIDATION
   * @param formGroup 
   */
  validateAllFormFields(formGroup: FormGroup) {
    let flag = true;
    let errors = [];

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          flag = false;
          errors.push(`${field} field is invalid.`);
        }
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

    return { result: flag, errors: errors };
  }

  /**
   * GET CLAIM TYPES
   */
  getClaimTypes() {
    return [
      { id: 1, name: 'String' },
      { id: 2, name: 'Int' },
      { id: 3, name: 'DateTime' },
      { id: 4, name: 'Boolean' }
    ];
  }

}
