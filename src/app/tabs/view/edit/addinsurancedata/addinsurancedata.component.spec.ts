import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddinsurancedataComponent } from './addinsurancedata.component';

describe('AddinsurancedataComponent', () => {
  let component: AddinsurancedataComponent;
  let fixture: ComponentFixture<AddinsurancedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinsurancedataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddinsurancedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
