import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyIndentComponent } from './verify-indent.component';

describe('VerifyIndentComponent', () => {
  let component: VerifyIndentComponent;
  let fixture: ComponentFixture<VerifyIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
