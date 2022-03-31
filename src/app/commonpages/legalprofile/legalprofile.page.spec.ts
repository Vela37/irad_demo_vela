import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalprofilePage } from './legalprofile.page';

describe('LegalprofilePage', () => {
  let component: LegalprofilePage;
  let fixture: ComponentFixture<LegalprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
