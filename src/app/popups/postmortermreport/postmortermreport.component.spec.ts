import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostmortermreportComponent } from './postmortermreport.component';

describe('PostmortermreportComponent', () => {
  let component: PostmortermreportComponent;
  let fixture: ComponentFixture<PostmortermreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmortermreportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostmortermreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
