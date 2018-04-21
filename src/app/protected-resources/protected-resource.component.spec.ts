import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedResourceComponent } from './protected-resource.component';

describe('ProtectedResourceComponent', () => {
  let component: ProtectedResourceComponent;
  let fixture: ComponentFixture<ProtectedResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
