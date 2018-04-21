import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListComponent } from './role-list.component';
import { RolesService } from '../../core/services/roles/roles.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from '../../shared/pipes/search-pipe.pipe';
import { SharedModule } from '../../shared/shared.module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('RoleListComponent', () => {
  let service: RolesService;
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [RoleListComponent],
      providers: [RolesService, SearchPipePipe]
    })
      .compileComponents();
    service = TestBed.get(RolesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load roles on init ', () => {
    let response = {
      status: 0,
      message: "",
      error: {},
      result: [
        { Id: '1', Name: 'user1', Description: 'description1',CreatedBy:1 },
        { Id: '2', Name: 'user2', Description: 'description2',CreatedBy:1 },
        { Id: '3', Name: 'user3', Description: 'description3',CreatedBy:1 }
      ]
    };
    // console.log(component.roles);
    spyOn(service, "getRoles").and.callFake(() => {
      return Observable.from([response]);
    })
    component.ngOnInit();

    expect(component.roles).toBe(response.result);
  });

  it('should set active role id on selectRole() call', () => {
    let role = { Id: '1', Name: 'role name', Description: 'role description',CreatedBy:1 };

    component.selectRole(role);

    expect(component.activeRoleId).toBe(role.Id);
  });
});
