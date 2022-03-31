import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InpedestrianPage } from './inpedestrian.page';

describe('InpedestrianPage', () => {
  let component: InpedestrianPage;
  let fixture: ComponentFixture<InpedestrianPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpedestrianPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InpedestrianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
