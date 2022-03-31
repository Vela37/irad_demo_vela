import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddrtoComponent } from './addrto.component';

describe('AddrtoComponent', () => {
  let component: AddrtoComponent;
  let fixture: ComponentFixture<AddrtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrtoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddrtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
