import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddwitnessComponent } from './addwitness.component';

describe('AddwitnessComponent', () => {
  let component: AddwitnessComponent;
  let fixture: ComponentFixture<AddwitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwitnessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddwitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
