import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportsviewPage } from './reportsview.page';

describe('ReportsviewPage', () => {
  let component: ReportsviewPage;
  let fixture: ComponentFixture<ReportsviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
