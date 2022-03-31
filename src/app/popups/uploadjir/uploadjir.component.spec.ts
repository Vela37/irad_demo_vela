import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadjirComponent } from './uploadjir.component';

describe('UploadjirComponent', () => {
  let component: UploadjirComponent;
  let fixture: ComponentFixture<UploadjirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadjirComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadjirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
