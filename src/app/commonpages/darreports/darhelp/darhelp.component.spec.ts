import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarhelpComponent } from './darhelp.component';

describe('DarhelpComponent', () => {
  let component: DarhelpComponent;
  let fixture: ComponentFixture<DarhelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarhelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
