import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddpsdistrictComponent } from './addpsdistrict.component';

describe('AddpsdistrictComponent', () => {
  let component: AddpsdistrictComponent;
  let fixture: ComponentFixture<AddpsdistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpsdistrictComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddpsdistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
