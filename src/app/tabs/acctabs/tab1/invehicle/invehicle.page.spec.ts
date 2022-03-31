import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvehiclePage } from './invehicle.page';

describe('InvehiclePage', () => {
  let component: InvehiclePage;
  let fixture: ComponentFixture<InvehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvehiclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
