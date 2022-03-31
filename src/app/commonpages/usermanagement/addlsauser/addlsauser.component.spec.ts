import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlsauserComponent } from './addlsauser.component';

describe('AddlsauserComponent', () => {
  let component: AddlsauserComponent;
  let fixture: ComponentFixture<AddlsauserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlsauserComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlsauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
