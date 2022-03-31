import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InpassengerPage } from './inpassenger.page';

describe('InpassengerPage', () => {
  let component: InpassengerPage;
  let fixture: ComponentFixture<InpassengerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpassengerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InpassengerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
