import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarlinksComponent } from './darlinks.component';

describe('DarlinksComponent', () => {
  let component: DarlinksComponent;
  let fixture: ComponentFixture<DarlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarlinksComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
