import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FieldofficerusercreationComponent } from './fieldofficerusercreation.component';

describe('FieldofficerusercreationComponent', () => {
  let component: FieldofficerusercreationComponent;
  let fixture: ComponentFixture<FieldofficerusercreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldofficerusercreationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldofficerusercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
