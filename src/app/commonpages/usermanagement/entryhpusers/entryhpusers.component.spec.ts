import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntryhpusersComponent } from './entryhpusers.component';

describe('EntryhpusersComponent', () => {
  let component: EntryhpusersComponent;
  let fixture: ComponentFixture<EntryhpusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryhpusersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryhpusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
