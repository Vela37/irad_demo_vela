import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmactusersComponent } from './addmactusers.component';

describe('AddmactusersComponent', () => {
  let component: AddmactusersComponent;
  let fixture: ComponentFixture<AddmactusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmactusersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmactusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
