import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DdrequestComponent } from './ddrequest.component';

describe('DdrequestComponent', () => {
  let component: DdrequestComponent;
  let fixture: ComponentFixture<DdrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdrequestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DdrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
