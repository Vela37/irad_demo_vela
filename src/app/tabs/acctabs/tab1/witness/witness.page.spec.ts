import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WitnessPage } from './witness.page';

describe('WitnessPage', () => {
  let component: WitnessPage;
  let fixture: ComponentFixture<WitnessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WitnessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
