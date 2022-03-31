import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighwayusercreationComponent } from './highwayusercreation.component';

describe('HighwayusercreationComponent', () => {
  let component: HighwayusercreationComponent;
  let fixture: ComponentFixture<HighwayusercreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighwayusercreationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighwayusercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
