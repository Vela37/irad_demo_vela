import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccmappingComponent } from './accmapping.component';

describe('AccmappingComponent', () => {
  let component: AccmappingComponent;
  let fixture: ComponentFixture<AccmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccmappingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
