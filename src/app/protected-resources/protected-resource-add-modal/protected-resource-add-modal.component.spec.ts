import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedResourceAddModalComponent } from './protected-resource-add-modal.component';

describe('ProtectedResourceAddModalComponent', () => {
  let component: ProtectedResourceAddModalComponent;
  let fixture: ComponentFixture<ProtectedResourceAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedResourceAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedResourceAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
