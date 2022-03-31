import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrunkendrivetestComponent } from './drunkendrivetest.component';

describe('DrunkendrivetestComponent', () => {
  let component: DrunkendrivetestComponent;
  let fixture: ComponentFixture<DrunkendrivetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrunkendrivetestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrunkendrivetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
