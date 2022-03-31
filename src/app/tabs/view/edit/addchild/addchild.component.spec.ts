import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddchildComponent } from './addchild.component';

describe('AddchildComponent', () => {
  let component: AddchildComponent;
  let fixture: ComponentFixture<AddchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchildComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
