import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarreportsPage } from './darreports.page';

describe('DarreportsPage', () => {
  let component: DarreportsPage;
  let fixture: ComponentFixture<DarreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarreportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
