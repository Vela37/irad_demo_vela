import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsuranceprofilePage } from './insuranceprofile.page';

describe('InsuranceprofilePage', () => {
  let component: InsuranceprofilePage;
  let fixture: ComponentFixture<InsuranceprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
