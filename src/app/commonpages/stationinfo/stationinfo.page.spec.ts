import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationinfoPage } from './stationinfo.page';

describe('StationinfoPage', () => {
  let component: StationinfoPage;
  let fixture: ComponentFixture<StationinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
