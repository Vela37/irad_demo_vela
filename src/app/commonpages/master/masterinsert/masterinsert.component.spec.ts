import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterinsertComponent } from './masterinsert.component';

describe('MasterinsertComponent', () => {
  let component: MasterinsertComponent;
  let fixture: ComponentFixture<MasterinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterinsertComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
