import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RolepersonalizationPage } from './rolepersonalization.page';

describe('RolepersonalizationPage', () => {
  let component: RolepersonalizationPage;
  let fixture: ComponentFixture<RolepersonalizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolepersonalizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RolepersonalizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
