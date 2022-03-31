import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlsausersComponent } from './addlsausers.component';

describe('AddlsausersComponent', () => {
  let component: AddlsausersComponent;
  let fixture: ComponentFixture<AddlsausersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlsausersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlsausersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
