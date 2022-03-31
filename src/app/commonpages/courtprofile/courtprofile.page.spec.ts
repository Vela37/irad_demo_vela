import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourtprofilePage } from './courtprofile.page';

describe('CourtprofilePage', () => {
  let component: CourtprofilePage;
  let fixture: ComponentFixture<CourtprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourtprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
