import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountriesComponent } from './total-countries.component';

describe('TotalCountriesComponent', () => {
  let component: TotalCountriesComponent;
  let fixture: ComponentFixture<TotalCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
