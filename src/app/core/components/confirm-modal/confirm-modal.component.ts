import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'authority-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent implements OnInit {

    public active: boolean = false;
    public body: string;
    public title: string;
    public onClose: Subject<boolean>;

    public constructor(private _bsModalRef: BsModalRef) { }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    /**
     * SHOW CONFIRM MODAL.
     * @param body 
     */
    public showConfirmationModal(body: string): void {
        this.body = body;
        this.active = true;
    }

    /**
     * CONFIRM WITH POSITIVE.
     */
    public onConfirm(): void {
        this.active = false;
        this.onClose.next(true);
        this._bsModalRef.hide();
    }

    /**
     * CONFIRM WITH NEGATIVE.
     */
    public onCancel(): void {
        this.active = false;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

    /**
     * HIDE CONFIRM MODAL.
     */
    public hideConfirmationModal(): void {
        this.active = false;
        this.onClose.next(null);
        this._bsModalRef.hide();
    }

}

