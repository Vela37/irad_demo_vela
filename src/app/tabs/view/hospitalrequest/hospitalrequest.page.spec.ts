import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitalrequestPage } from './hospitalrequest.page';

describe('HospitalrequestPage', () => {
  let component: HospitalrequestPage;
  let fixture: ComponentFixture<HospitalrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalrequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
