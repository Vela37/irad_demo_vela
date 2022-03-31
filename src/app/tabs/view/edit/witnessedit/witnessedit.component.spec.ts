import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WitnesseditComponent } from './witnessedit.component';

describe('WitnesseditComponent', () => {
  let component: WitnesseditComponent;
  let fixture: ComponentFixture<WitnesseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnesseditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WitnesseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
