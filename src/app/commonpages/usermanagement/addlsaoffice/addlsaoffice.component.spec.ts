import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlsaofficeComponent } from './addlsaoffice.component';

describe('AddlsaofficeComponent', () => {
  let component: AddlsaofficeComponent;
  let fixture: ComponentFixture<AddlsaofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlsaofficeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlsaofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
