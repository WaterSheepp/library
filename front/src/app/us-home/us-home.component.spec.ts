import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsHomeComponent } from './us-home.component';

describe('UsHomeComponent', () => {
  let component: UsHomeComponent;
  let fixture: ComponentFixture<UsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
