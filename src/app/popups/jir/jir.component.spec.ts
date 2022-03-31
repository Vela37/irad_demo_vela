import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JirComponent } from './jir.component';

describe('JirComponent', () => {
  let component: JirComponent;
  let fixture: ComponentFixture<JirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JirComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
