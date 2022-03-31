import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VictimtabsPage } from './victimtabs.page';

describe('VictimtabsPage', () => {
  let component: VictimtabsPage;
  let fixture: ComponentFixture<VictimtabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VictimtabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VictimtabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
