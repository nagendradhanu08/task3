import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { ToastrServiceProvider } from '../../core/services/index';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { ProtectedResourcesService } from '../../core/services/protected-resources/protected-resources.service';
import { ProtectedResource } from '../../core/model/ProtectedResource.model';

@Component({
  selector: 'authority-protected-resource-list',
  templateUrl: './protected-resource-list.component.html',
  styleUrls: ['./protected-resource-list.component.sass']
})
export class ProtectedResourceListComponent implements OnInit, AfterViewInit {

  _searchText: string;
  protectedResource: ProtectedResource;
  activeProtectedResourceId: any;
  _protectedResources: ProtectedResource[] = [];
  filteredProtectedResources: ProtectedResource[] = [];

  @Output() selectedProtectedResource: EventEmitter<ProtectedResource> = new EventEmitter<ProtectedResource>();

  constructor(
    private _toast: ToastrServiceProvider,
    private _protectedResourceService: ProtectedResourcesService,
    private searchPipe: SearchPipePipe
  ) { }

  // GETTERS & SETTERS - PROTECTED RESOURCES.
  get protectedResources() {
    return this._protectedResources;
  }
  set protectedResources(protectedResources: ProtectedResource[]) {
    this._protectedResources = protectedResources;
    this.filteredProtectedResources = this._protectedResources;
  }

  // GETTERS & SETTERS - SEARCH TEXT.
  get searchText() {
    return this._searchText;
  }
  set searchText(search: string) {
    this._searchText = search;

    //FILTER LIST WITH SEARCH TEXT.
    this.filteredProtectedResources = this.searchText ? this.searchPipe.transform(this.protectedResources, this.searchText) : this.protectedResources;
  }

  ngOnInit() {
    this._protectedResourceService.getProtectedResources().subscribe(
      response => {
        if (response.status) {
          this.protectedResources = response.result;
          this.selectProtectedResource(this.filteredProtectedResources[0]);
        } else {
          this._toast.error('something went wrong.', 'Error');
        }
      }, err => {
        this._toast.error(err.error, 'Error');
      }
    )
  }
  ngAfterViewInit() {
    if (this.filteredProtectedResources.length > 0) {
      this.selectProtectedResource(this.filteredProtectedResources[0]);
    }
  }

  /**
   * SELECT PROTECTED RESOURCE.
   * @param protectedResource 
   */
  selectProtectedResource(protectedResource: ProtectedResource) {
    this.activeProtectedResourceId = protectedResource.Id;
    this.protectedResource = protectedResource;
    this.selectedProtectedResource.emit(protectedResource);
  }

}