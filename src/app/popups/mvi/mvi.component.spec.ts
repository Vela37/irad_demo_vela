import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MviComponent } from './mvi.component';

describe('MviComponent', () => {
  let component: MviComponent;
  let fixture: ComponentFixture<MviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MviComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
