import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReleasenotesPage } from './releasenotes.page';

describe('ReleasenotesPage', () => {
  let component: ReleasenotesPage;
  let fixture: ComponentFixture<ReleasenotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasenotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleasenotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
