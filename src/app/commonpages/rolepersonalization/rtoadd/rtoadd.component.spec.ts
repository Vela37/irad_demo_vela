import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtoaddComponent } from './rtoadd.component';

describe('RtoaddComponent', () => {
  let component: RtoaddComponent;
  let fixture: ComponentFixture<RtoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtoaddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
