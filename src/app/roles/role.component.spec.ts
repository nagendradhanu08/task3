import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RoleComponent } from './role.component';
import { RolesService } from '../core/services/roles/roles.service';
import { Role } from '../core/model/roles.model';
import { RoleListComponent } from './role-list/role-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from '../shared/pipes/search-pipe.pipe';
import { RoleAddModalComponent } from './role-add-modal/role-add-modal.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  let service: RolesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [RoleComponent, RoleListComponent, RoleAddModalComponent, RoleEditComponent],
      providers: [RolesService, SearchPipePipe]
    })
      .compileComponents();
    service = TestBed.get(RolesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the authority-role-list component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('authority-role-list')).not.toBe(null);
  });

  it('should have the authority-role-edit component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('authority-role-edit')).not.toBe(null);
  });

  it('should not have the authority-role-add-modal component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('authority-role-add-modal')).toBe(null);
  });
  
  it('should have the authority-role-add-modal component if addRole() called.', () => {
    component.showModal();
    
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('authority-role-add-modal')).not.toBe(null);
  });
});
