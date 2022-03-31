import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddpsstationComponent } from './addpsstation.component';

describe('AddpsstationComponent', () => {
  let component: AddpsstationComponent;
  let fixture: ComponentFixture<AddpsstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpsstationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddpsstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
