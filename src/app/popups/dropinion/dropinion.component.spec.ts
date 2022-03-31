import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropinionComponent } from './dropinion.component';

describe('DropinionComponent', () => {
  let component: DropinionComponent;
  let fixture: ComponentFixture<DropinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropinionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
