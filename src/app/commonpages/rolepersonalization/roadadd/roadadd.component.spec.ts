import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoadaddComponent } from './roadadd.component';

describe('RoadaddComponent', () => {
  let component: RoadaddComponent;
  let fixture: ComponentFixture<RoadaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadaddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoadaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
