import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefferComponent } from './reffer.component';

describe('RefferComponent', () => {
  let component: RefferComponent;
  let fixture: ComponentFixture<RefferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
