import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddhwdivisionComponent } from './addhwdivision.component';

describe('AddhwdivisionComponent', () => {
  let component: AddhwdivisionComponent;
  let fixture: ComponentFixture<AddhwdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhwdivisionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddhwdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
