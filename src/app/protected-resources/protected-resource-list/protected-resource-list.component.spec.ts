import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedResourceListComponent } from './protected-resource-list.component';

describe('ProtectedResourceListComponent', () => {
  let component: ProtectedResourceListComponent;
  let fixture: ComponentFixture<ProtectedResourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedResourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
