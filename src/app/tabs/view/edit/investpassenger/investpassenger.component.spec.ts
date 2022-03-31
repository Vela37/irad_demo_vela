import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvestpassengerComponent } from './investpassenger.component';

describe('InvestpassengerComponent', () => {
  let component: InvestpassengerComponent;
  let fixture: ComponentFixture<InvestpassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestpassengerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestpassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
