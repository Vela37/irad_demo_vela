import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddlegaladataComponent } from './addlegaladata.component';

describe('AddlegaladataComponent', () => {
  let component: AddlegaladataComponent;
  let fixture: ComponentFixture<AddlegaladataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlegaladataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddlegaladataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
