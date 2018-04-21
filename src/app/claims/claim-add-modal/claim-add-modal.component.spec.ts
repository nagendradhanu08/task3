import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimAddModalComponent } from './claim-add-modal.component';

describe('ClaimAddModalComponent', () => {
  let component: ClaimAddModalComponent;
  let fixture: ComponentFixture<ClaimAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
