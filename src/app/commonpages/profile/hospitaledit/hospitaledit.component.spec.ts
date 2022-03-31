import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitaleditComponent } from './hospitaledit.component';

describe('HospitaleditComponent', () => {
  let component: HospitaleditComponent;
  let fixture: ComponentFixture<HospitaleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitaleditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitaleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
