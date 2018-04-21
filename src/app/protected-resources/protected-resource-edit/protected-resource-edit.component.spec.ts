import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedResourceEditComponent } from './protected-resource-edit.component';

describe('ProtectedResourceEditComponent', () => {
  let component: ProtectedResourceEditComponent;
  let fixture: ComponentFixture<ProtectedResourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedResourceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedResourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
