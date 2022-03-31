import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarlistPage } from './darlist.page';

describe('DarlistPage', () => {
  let component: DarlistPage;
  let fixture: ComponentFixture<DarlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
