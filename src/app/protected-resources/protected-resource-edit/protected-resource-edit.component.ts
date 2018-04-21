import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProtectedResource } from '../../core/model/ProtectedResource.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrServiceProvider, CommonService } from '../../core/services/index';
import { ProtectedResourcesService } from '../../core/services/protected-resources/protected-resources.service';

@Component({
  selector: 'authority-protected-resource-edit',
  templateUrl: './protected-resource-edit.component.html',
  styleUrls: ['./protected-resource-edit.component.sass']
})
export class ProtectedResourceEditComponent implements OnInit {

  protectedResource: ProtectedResource;
  protectedResourceForm: FormGroup;
  protectedResourceList: any = [];
  ApiSecrets: any=[];
  ApiScopes: any=[];
 

  @Output() updatedProtectedResource: EventEmitter<ProtectedResource> = new EventEmitter<ProtectedResource>();
  @Output() deletedProtectedResource: EventEmitter<ProtectedResource> = new EventEmitter<ProtectedResource>();


  constructor(
    private _toast: ToastrServiceProvider,
    private _fb: FormBuilder,
    private _common: CommonService,
    private _protectedResourceService: ProtectedResourcesService,
  ) { }
  newApisecrets = this._fb.group({
    Type: null,
    Value: null,
    Description: null,
    Expiration: null
  });

  ngOnInit() {
    this.protectedResourceForm = this.buildProtectedResourceForm(this.newProtectedResource());
    // this.getProtectedResource();
  }

  onProtectedResourceEditSelect(protectedResource: ProtectedResource) {
    this._protectedResourceService.getProtectedResource(protectedResource.Id).subscribe(
      response => {
        if (response.status) {
          this.protectedResource = response.result;
          this.ApiSecrets = response.result.ApiSecrets;
          this.ApiScopes = response.result.ApiScopes;
          console.log("protectedrseource1",  this.ApiSecrets);
          this.protectedResourceForm = this.buildProtectedResourceForm(this.protectedResource);
          console.log(this.protectedResourceForm);
        } else {
          this._toast.error(response.errors);
        }
      }, err => {
        this._toast.error(err.errors);
      }
    );
  }


  /**
   * DELETE & EMIT PROTECTED RESOURCE
   */
  deleteProtectedResource() {
    this._common.confirmBox('Are you sure you want to delete this PROTECTED RESOURCE?').subscribe(result => {
      let confirm = result;

      if (confirm) {
        this._protectedResourceService.deleteProtectedResource(this.protectedResource.Id).subscribe(
          response => {
            if (response.status) {
              this._toast.success(response.message, 'Success');
              this.deletedProtectedResource.emit(this.protectedResource);
            } else {
              this._toast.error(response.message, 'Error');
            }
          }, err => {
            this._toast.error(err.errors, 'Failed');
          }
        );
      }

    });
  }


  updateProtectedResource() {
    let updatedProtectedResource = Object.assign({}, this.protectedResource, this.protectedResourceForm.getRawValue());
    console.log(updatedProtectedResource);
  }

  newProtectedResource(): ProtectedResource {
    return {
      Id: null,
      Name: null,
      Description: null,
      DisplayName: null,
      Required: false,
      ShowInDiscoveryDocument: false,
      Emphasize: false,
      Value: null,
      Type: null
    }
  }

  buildProtectedResourceForm(data: ProtectedResource): FormGroup {
    return this._fb.group({
      Id: [data.Id],
      Name: [{ value: data.Name, disabled: true }],
      Description: [data.Description],
      DisplayName: [data.DisplayName],
      Required: [data.Required],
      ShowInDiscoveryDocument: [data.ShowInDiscoveryDocument],
      Emphasize: [data.Emphasize],
      Value: [data.Value],
      Type: [data.Type]
    })
  }


  saveSecret(newApisecrets) {
    // ApiData=this.newApisecrets;
    console.log("apiSecrets", this.newApisecrets.value);
    
  //  this.ApiSecrets.push(this.newApisecrets.value);
    console.log("apisecretdata",this.ApiSecrets);
  }


  deleteApiSecrets(type){

    this.ApiSecrets.forEach(element => {
      console.log('>'+element.ApiResourceId);
      if(element.ApiResourceId==type){
        this.ApiSecrets.splice(element);
      }
    });
    console.log("type",type);
   
  }



}
