import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtocreationComponent } from './rtocreation.component';

describe('RtocreationComponent', () => {
  let component: RtocreationComponent;
  let fixture: ComponentFixture<RtocreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtocreationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtocreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
