import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IdentityResource, IdentityClaims } from '../../core/model/IdentityResource.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrServiceProvider, CommonService } from '../../core/services/index';
import { IdentityResourcesService } from '../../core/services/identity-resources/identity-resources.service';

@Component({
  selector: 'authority-identity-resource-edit',
  templateUrl: './identity-resource-edit.component.html',
  styleUrls: ['./identity-resource-edit.component.sass']
})
export class IdentityResourceEditComponent implements OnInit {

  identityResource: IdentityResource;
  identityResourceForm: FormGroup;

  @Output() updatedIdentityResource: EventEmitter<IdentityResource> = new EventEmitter<IdentityResource>();
  @Output() deletedIdentityResource: EventEmitter<IdentityResource> = new EventEmitter<IdentityResource>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _identityResourceService: IdentityResourcesService,
  ) { }

  ngOnInit() {
    this.identityResourceForm = this.buildIdentityResourceForm(this.newIdentityResource());
  }

  onIdentityResourceEditSelect(identityResource: IdentityResource) {
    this._identityResourceService.getIdentityResource(identityResource.Id).subscribe(
      response => {
        if (response.status) {
          this.identityResource = response.result;
          this.identityResourceForm = this.buildIdentityResourceForm(this.identityResource);
          console.log(this.identityResourceForm);
        } else {
          this._toast.error(response.errors);
        }
      }, err => {
        this._toast.error(err.errors);
      }
    );
  }

  updateIdentityResource() {
    let updatedIdentityResource = Object.assign({}, this.identityResource, this.identityResourceForm.getRawValue());
    console.log(updatedIdentityResource);
  }

  newIdentityResource(): IdentityResource {
    return {
      Id: null,
      Name: null,
      Description: null,
      DisplayName: null,
      Required: false,
      ShowInDiscoveryDocument: false,
      Emphasize: false,
      IdentityClaims: []
    }
  }

  buildIdentityResourceForm(data: IdentityResource): FormGroup {
    return this._fb.group({
      Id: [data.Id],
      Name: [{ value: data.Name, disabled: true }],
      Description: [data.Description],
      DisplayName: [data.DisplayName],
      Required: [data.Required],
      ShowInDiscoveryDocument: [data.ShowInDiscoveryDocument],
      Emphasize: [data.Emphasize],
      IdentityClaims: this._fb.array(this.buildIdentityClaimsArray(data.IdentityClaims || []))
    })
  }

  buildIdentityClaimsArray(data): Array<IdentityClaims> {
    return data.map(identityClaim => {
      return this._fb.group({
        Id: [identityClaim.Id],
        Type: [identityClaim.Type],
        IdentityResourceId: [identityClaim.IdentityResourceId],
        Checked: false
      })
    })
  }

}
