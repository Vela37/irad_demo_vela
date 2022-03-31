import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DdformComponent } from './ddform.component';

describe('DdformComponent', () => {
  let component: DdformComponent;
  let fixture: ComponentFixture<DdformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdformComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DdformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
