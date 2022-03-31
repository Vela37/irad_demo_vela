import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DargenralcComponent } from './dargenralc.component';

describe('DargenralcComponent', () => {
  let component: DargenralcComponent;
  let fixture: ComponentFixture<DargenralcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DargenralcComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DargenralcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
