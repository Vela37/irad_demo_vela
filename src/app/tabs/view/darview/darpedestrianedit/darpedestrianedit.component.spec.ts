import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarpedestrianeditComponent } from './darpedestrianedit.component';

describe('DarpedestrianeditComponent', () => {
  let component: DarpedestrianeditComponent;
  let fixture: ComponentFixture<DarpedestrianeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarpedestrianeditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarpedestrianeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
