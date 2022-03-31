import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListrequestPage } from './listrequest.page';

describe('ListrequestPage', () => {
  let component: ListrequestPage;
  let fixture: ComponentFixture<ListrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListrequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
