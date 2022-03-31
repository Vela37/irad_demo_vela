import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarchildeditComponent } from './darchildedit.component';

describe('DarchildeditComponent', () => {
  let component: DarchildeditComponent;
  let fixture: ComponentFixture<DarchildeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarchildeditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarchildeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
