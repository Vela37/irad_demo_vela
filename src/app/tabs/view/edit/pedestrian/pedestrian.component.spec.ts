import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedestrianComponent } from './pedestrian.component';

describe('PedestrianComponent', () => {
  let component: PedestrianComponent;
  let fixture: ComponentFixture<PedestrianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedestrianComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedestrianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
