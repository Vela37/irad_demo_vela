import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalservicethirdComponent } from './legalservicethird.component';

describe('LegalservicethirdComponent', () => {
  let component: LegalservicethirdComponent;
  let fixture: ComponentFixture<LegalservicethirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalservicethirdComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalservicethirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
