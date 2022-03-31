import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarviewPage } from './darview.page';

describe('DarviewPage', () => {
  let component: DarviewPage;
  let fixture: ComponentFixture<DarviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
