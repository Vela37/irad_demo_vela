import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeathreasonComponent } from './deathreason.component';

describe('DeathreasonComponent', () => {
  let component: DeathreasonComponent;
  let fixture: ComponentFixture<DeathreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathreasonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeathreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
