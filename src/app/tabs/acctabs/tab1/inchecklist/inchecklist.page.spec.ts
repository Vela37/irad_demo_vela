import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InchecklistPage } from './inchecklist.page';

describe('InchecklistPage', () => {
  let component: InchecklistPage;
  let fixture: ComponentFixture<InchecklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InchecklistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InchecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
