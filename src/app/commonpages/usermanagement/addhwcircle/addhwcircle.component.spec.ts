import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddhwcircleComponent } from './addhwcircle.component';

describe('AddhwcircleComponent', () => {
  let component: AddhwcircleComponent;
  let fixture: ComponentFixture<AddhwcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhwcircleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddhwcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
