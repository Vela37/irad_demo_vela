import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SumbitformsComponent } from './sumbitforms.component';

describe('SumbitformsComponent', () => {
  let component: SumbitformsComponent;
  let fixture: ComponentFixture<SumbitformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumbitformsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SumbitformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
