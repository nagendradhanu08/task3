import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityResourceListComponent } from './identity-resource-list.component';

describe('IdentityResourceListComponent', () => {
  let component: IdentityResourceListComponent;
  let fixture: ComponentFixture<IdentityResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityResourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
