import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoleEditComponent } from './role-edit.component';
import { RolesService } from '../../core/services/roles/roles.service';

describe('RoleEditComponent', () => {
  let component: RoleEditComponent;
  let fixture: ComponentFixture<RoleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [RoleEditComponent],
      providers: [RolesService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create all controls.', () => {
    expect(component.roleForm.contains('Id')).toBeTruthy();
    expect(component.roleForm.contains('Name')).toBeTruthy();
    expect(component.roleForm.contains('Description')).toBeTruthy();
  });

  it('should validate all required fields against empty string("")', () => {
    let IdCtrl = component.roleForm.get('Id');
    let NameCtrl = component.roleForm.get('Name');
    let DescriptionCtrl = component.roleForm.get('Description');

    IdCtrl.setValue('');
    NameCtrl.setValue('');
    DescriptionCtrl.setValue('');

    expect(IdCtrl.valid).toBeFalsy();
    expect(NameCtrl.valid).toBeFalsy();
    expect(DescriptionCtrl.valid).toBeFalsy();
  });

  it('should validate all required fields against null', () => {
    let IdCtrl = component.roleForm.get('Id');
    let NameCtrl = component.roleForm.get('Name');
    let DescriptionCtrl = component.roleForm.get('Description');

    IdCtrl.setValue(null);
    NameCtrl.setValue(null);
    DescriptionCtrl.setValue(null);

    expect(IdCtrl.valid).toBeFalsy();
    expect(NameCtrl.valid).toBeFalsy();
    expect(DescriptionCtrl.valid).toBeFalsy();
  });

  it('should emit updatedRole when updateRole called.', () => {
    let updatedRole = null;
    component.role = { Id: '1', Name: 'userRole', Description: 'userRole description' };
    component.updatedRole.subscribe(data => updatedRole = data);

    component.updateRole();

    expect(typeof updatedRole).toBe(typeof {});
  });

  it('should emit deletedRole when deleteRole called.', () => {
    let deletedRole = null;
    component.role = { Id: '1', Name: 'userRole', Description: 'userRole description' };
    component.deletedRole.subscribe(data => { console.log(123); deletedRole = data });

    component.deleteRole();
    console.log(deletedRole);

    expect(typeof deletedRole).toBe(typeof {});
  });

});
