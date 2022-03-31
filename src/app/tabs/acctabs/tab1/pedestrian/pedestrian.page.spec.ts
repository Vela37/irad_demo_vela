import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedestrianPage } from './pedestrian.page';

describe('PedestrianPage', () => {
  let component: PedestrianPage;
  let fixture: ComponentFixture<PedestrianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedestrianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedestrianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
