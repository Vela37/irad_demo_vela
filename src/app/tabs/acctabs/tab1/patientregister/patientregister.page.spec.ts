import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientregisterPage } from './patientregister.page';

describe('PatientregisterPage', () => {
  let component: PatientregisterPage;
  let fixture: ComponentFixture<PatientregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientregisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
