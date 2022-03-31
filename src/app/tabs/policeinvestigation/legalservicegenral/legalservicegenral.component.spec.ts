import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalservicegenralComponent } from './legalservicegenral.component';

describe('LegalservicegenralComponent', () => {
  let component: LegalservicegenralComponent;
  let fixture: ComponentFixture<LegalservicegenralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalservicegenralComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalservicegenralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
