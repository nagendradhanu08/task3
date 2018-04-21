import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { ToastrServiceProvider } from '../../core/services/index';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { IdentityResourcesService } from '../../core/services/identity-resources/identity-resources.service';
import { IdentityResource } from '../../core/model/IdentityResource.model';

@Component({
  selector: 'authority-identity-resource-list',
  templateUrl: './identity-resource-list.component.html',
  styleUrls: ['./identity-resource-list.component.sass']
})
export class IdentityResourceListComponent implements OnInit, AfterViewInit {

  _searchText: string;
  identityResource: IdentityResource;
  activeIdentityResourceId: any;
  _identityResources: IdentityResource[] = [];
  filteredIdentityResources: IdentityResource[] = [];

  @Output() selectedIdentityResource: EventEmitter<IdentityResource> = new EventEmitter<IdentityResource>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _identityResourceService: IdentityResourcesService,
    private searchPipe: SearchPipePipe
  ) { }

  // GETTERS & SETTERS - IDENTITY RESOURCES.
  get identityResources() {
    return this._identityResources;
  }
  set identityResources(identityResources: IdentityResource[]) {
    this._identityResources = identityResources;
    this.filteredIdentityResources = this._identityResources;
  }

  // GETTERS & SETTERS - SEARCH TEXT.
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;

    //FILTER LIST WITH SEARCH TEXT.
    this.filteredIdentityResources = this.searchText ? this.searchPipe.transform(this.identityResources, this.searchText) : this.identityResources;
  }

  ngOnInit() {
    this._identityResourceService.getIdentityResources().subscribe(
      response => {
        if (response.status) {
          this.identityResources = response.result;
          this.selectIdentityResource(this.filteredIdentityResources[0]);
        } else {
          this._toast.error('something went wrong.', 'Error');
        }
      }, err => {
        this._toast.error(err.error, 'Error');
      }
    )
  }
  ngAfterViewInit() {
    if (this.filteredIdentityResources.length > 0) {
      this.selectIdentityResource(this.filteredIdentityResources[0]);
    }
  }

  /**
   * SELECT IDENTITY RESOURCE.
   * @param identityResource 
   */
  selectIdentityResource(identityResource: IdentityResource) {
    this.activeIdentityResourceId = identityResource.Id;
    this.identityResource = identityResource;
    this.selectedIdentityResource.emit(identityResource);
  }

}
