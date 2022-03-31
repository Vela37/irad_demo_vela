import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfflinemediaPage } from './offlinemedia.page';

describe('OfflinemediaPage', () => {
  let component: OfflinemediaPage;
  let fixture: ComponentFixture<OfflinemediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflinemediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfflinemediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
