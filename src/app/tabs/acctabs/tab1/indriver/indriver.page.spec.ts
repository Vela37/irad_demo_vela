import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndriverPage } from './indriver.page';

describe('IndriverPage', () => {
  let component: IndriverPage;
  let fixture: ComponentFixture<IndriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndriverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
