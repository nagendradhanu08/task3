import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResourceAddModalComponent } from './identity-resource-add-modal.component';

describe('IdentityResourceAddModalComponent', () => {
  let component: IdentityResourceAddModalComponent;
  let fixture: ComponentFixture<IdentityResourceAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResourceAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResourceAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
