import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarlinksumbittedComponent } from './darlinksumbitted.component';

describe('DarlinksumbittedComponent', () => {
  let component: DarlinksumbittedComponent;
  let fixture: ComponentFixture<DarlinksumbittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarlinksumbittedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarlinksumbittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
