import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarpassengereditComponent } from './darpassengeredit.component';

describe('DarpassengereditComponent', () => {
  let component: DarpassengereditComponent;
  let fixture: ComponentFixture<DarpassengereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarpassengereditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarpassengereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
