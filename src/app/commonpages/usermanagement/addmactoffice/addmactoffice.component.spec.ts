import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmactofficeComponent } from './addmactoffice.component';

describe('AddmactofficeComponent', () => {
  let component: AddmactofficeComponent;
  let fixture: ComponentFixture<AddmactofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmactofficeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmactofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
