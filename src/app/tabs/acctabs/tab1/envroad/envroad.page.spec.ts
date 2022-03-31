import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnvroadPage } from './envroad.page';

describe('EnvroadPage', () => {
  let component: EnvroadPage;
  let fixture: ComponentFixture<EnvroadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvroadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvroadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
