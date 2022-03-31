import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarfamilyeditComponent } from './darfamilyedit.component';

describe('DarfamilyeditComponent', () => {
  let component: DarfamilyeditComponent;
  let fixture: ComponentFixture<DarfamilyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarfamilyeditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarfamilyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
