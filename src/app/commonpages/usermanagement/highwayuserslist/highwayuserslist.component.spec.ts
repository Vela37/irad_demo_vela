import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighwayuserslistComponent } from './highwayuserslist.component';

describe('HighwayuserslistComponent', () => {
  let component: HighwayuserslistComponent;
  let fixture: ComponentFixture<HighwayuserslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighwayuserslistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighwayuserslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
