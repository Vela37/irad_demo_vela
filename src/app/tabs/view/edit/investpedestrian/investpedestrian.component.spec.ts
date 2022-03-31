import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvestpedestrianComponent } from './investpedestrian.component';

describe('InvestpedestrianComponent', () => {
  let component: InvestpedestrianComponent;
  let fixture: ComponentFixture<InvestpedestrianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestpedestrianComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestpedestrianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
