import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocPage } from './loc.page';

describe('LocPage', () => {
  let component: LocPage;
  let fixture: ComponentFixture<LocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
