import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoleAddModalComponent } from './role-add-modal.component';
import { RolesService } from '../../core/services/roles/roles.service';
import { HttpClientModule } from '@angular/common/http';

describe('RoleAddModalComponent', () => {
  let component: RoleAddModalComponent;
  let fixture: ComponentFixture<RoleAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [RoleAddModalComponent],
      providers: [RolesService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create all controls.', () => {
    // expect(component.roleForm.contains('Id')).toBeTruthy();
    expect(component.roleForm.contains('Name')).toBeTruthy();
    expect(component.roleForm.contains('Description')).toBeTruthy();
  });

  it('should validate all required fields against empty string("")', () => {
    // let idCtrl = component.roleForm.get('id');
    let NameCtrl = component.roleForm.get('Name');
    let DescriptionCtrl = component.roleForm.get('Description');

    // idCtrl.setValue('');
    NameCtrl.setValue('');
    DescriptionCtrl.setValue('');

    // expect(idCtrl.valid).toBeFalsy();
    expect(NameCtrl.valid).toBeFalsy();
    expect(DescriptionCtrl.valid).toBeFalsy();
  });

  it('should validate all required fields against null', () => {
    // let idCtrl = component.roleForm.get('id');
    let NameCtrl = component.roleForm.get('Name');
    let DescriptionCtrl = component.roleForm.get('Description');

    // idCtrl.setValue(null);
    NameCtrl.setValue(null);
    DescriptionCtrl.setValue(null);

    // expect(idCtrl.valid).toBeFalsy();
    expect(NameCtrl.valid).toBeFalsy();
    expect(DescriptionCtrl.valid).toBeFalsy();
  });

  it('should clear form data on clearForm() called', () => {
    let NameCtrl = component.roleForm.get('Name');
    NameCtrl.setValue('abc');

    component.clearForm();

    expect(NameCtrl.value).toBeNull();
  })

  it('should reset form with empty data on cancelAdd() called', () => {
    // let idCtrl = component.roleForm.get('id');
    let NameCtrl = component.roleForm.get('Name');
    let DescriptionCtrl = component.roleForm.get('Description');
    
    // idCtrl.setValue('123');
    NameCtrl.setValue('Roel123');
    DescriptionCtrl.setValue('Description123');

    component.cancelAdd();

    // expect(IdCtrl.value).toBeNull();
    expect(component.roleForm.get('Name').value).toBeNull();
    expect(component.roleForm.get('Description').value).toBeNull();
  })
});
