import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsurancegenraleditComponent } from './insurancegenraledit.component';

describe('InsurancegenraleditComponent', () => {
  let component: InsurancegenraleditComponent;
  let fixture: ComponentFixture<InsurancegenraleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancegenraleditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsurancegenraleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
