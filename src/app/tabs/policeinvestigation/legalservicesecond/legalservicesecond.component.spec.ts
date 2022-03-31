import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalservicesecondComponent } from './legalservicesecond.component';

describe('LegalservicesecondComponent', () => {
  let component: LegalservicesecondComponent;
  let fixture: ComponentFixture<LegalservicesecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalservicesecondComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalservicesecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
