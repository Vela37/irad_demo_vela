import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvestigationPage } from './investigation.page';

describe('InvestigationPage', () => {
  let component: InvestigationPage;
  let fixture: ComponentFixture<InvestigationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestigationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
