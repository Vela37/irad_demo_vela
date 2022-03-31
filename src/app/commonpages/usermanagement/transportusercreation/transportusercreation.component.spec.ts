import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportusercreationComponent } from './transportusercreation.component';

describe('TransportusercreationComponent', () => {
  let component: TransportusercreationComponent;
  let fixture: ComponentFixture<TransportusercreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportusercreationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportusercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
