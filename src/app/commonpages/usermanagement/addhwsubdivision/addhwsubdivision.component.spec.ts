import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddhwsubdivisionComponent } from './addhwsubdivision.component';

describe('AddhwsubdivisionComponent', () => {
  let component: AddhwsubdivisionComponent;
  let fixture: ComponentFixture<AddhwsubdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhwsubdivisionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddhwsubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
