import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarinformationComponent } from './darinformation.component';

describe('DarinformationComponent', () => {
  let component: DarinformationComponent;
  let fixture: ComponentFixture<DarinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarinformationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
