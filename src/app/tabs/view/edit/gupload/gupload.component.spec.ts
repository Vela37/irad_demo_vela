import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuploadComponent } from './gupload.component';

describe('GuploadComponent', () => {
  let component: GuploadComponent;
  let fixture: ComponentFixture<GuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuploadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
