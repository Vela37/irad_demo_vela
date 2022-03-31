import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientstmtComponent } from './patientstmt.component';

describe('PatientstmtComponent', () => {
  let component: PatientstmtComponent;
  let fixture: ComponentFixture<PatientstmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientstmtComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientstmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
