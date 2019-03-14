import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDeleteComponent } from './distributor-delete.component';

describe('DistributorDeleteComponent', () => {
  let component: DistributorDeleteComponent;
  let fixture: ComponentFixture<DistributorDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
