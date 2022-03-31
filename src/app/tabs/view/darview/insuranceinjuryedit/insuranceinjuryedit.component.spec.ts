import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsuranceinjuryeditComponent } from './insuranceinjuryedit.component';

describe('InsuranceinjuryeditComponent', () => {
  let component: InsuranceinjuryeditComponent;
  let fixture: ComponentFixture<InsuranceinjuryeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceinjuryeditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceinjuryeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
