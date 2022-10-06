import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecivingComponent } from './view-reciving.component';

describe('ViewRecivingComponent', () => {
  let component: ViewRecivingComponent;
  let fixture: ComponentFixture<ViewRecivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
