import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceivingComponent } from './add-receiving.component';

describe('AddReceivingComponent', () => {
  let component: AddReceivingComponent;
  let fixture: ComponentFixture<AddReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReceivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
