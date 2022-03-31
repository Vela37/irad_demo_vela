import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InownerPage } from './inowner.page';

describe('InownerPage', () => {
  let component: InownerPage;
  let fixture: ComponentFixture<InownerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InownerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InownerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
