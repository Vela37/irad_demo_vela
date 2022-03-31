import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegallistPage } from './legallist.page';

describe('LegallistPage', () => {
  let component: LegallistPage;
  let fixture: ComponentFixture<LegallistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegallistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegallistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
