import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitaljurPage } from './hospitaljur.page';

describe('HospitaljurPage', () => {
  let component: HospitaljurPage;
  let fixture: ComponentFixture<HospitaljurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitaljurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitaljurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
