import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPercentComponent } from './total-percent.component';

describe('TotalPercentComponent', () => {
  let component: TotalPercentComponent;
  let fixture: ComponentFixture<TotalPercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPercentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
