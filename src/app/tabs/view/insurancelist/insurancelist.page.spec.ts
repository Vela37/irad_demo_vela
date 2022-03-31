import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsurancelistPage } from './insurancelist.page';

describe('InsurancelistPage', () => {
  let component: InsurancelistPage;
  let fixture: ComponentFixture<InsurancelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsurancelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
