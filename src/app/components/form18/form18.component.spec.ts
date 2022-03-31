import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Form18Component } from './form18.component';

describe('Form18Component', () => {
  let component: Form18Component;
  let fixture: ComponentFixture<Form18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form18Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Form18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
