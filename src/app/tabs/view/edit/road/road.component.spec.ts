import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoadComponent } from './road.component';

describe('RoadComponent', () => {
  let component: RoadComponent;
  let fixture: ComponentFixture<RoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
