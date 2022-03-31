import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngeneralPage } from './ingeneral.page';

describe('IngeneralPage', () => {
  let component: IngeneralPage;
  let fixture: ComponentFixture<IngeneralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngeneralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
