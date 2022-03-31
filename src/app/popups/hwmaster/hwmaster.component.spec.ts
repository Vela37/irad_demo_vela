import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HwmasterComponent } from './hwmaster.component';

describe('HwmasterComponent', () => {
  let component: HwmasterComponent;
  let fixture: ComponentFixture<HwmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HwmasterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HwmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
