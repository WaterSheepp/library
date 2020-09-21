import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbManagementComponent } from './mb-management.component';

describe('MbManagementComponent', () => {
  let component: MbManagementComponent;
  let fixture: ComponentFixture<MbManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
