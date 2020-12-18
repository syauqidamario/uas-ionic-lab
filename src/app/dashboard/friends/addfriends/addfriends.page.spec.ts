import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddfriendsPage } from './addfriends.page';

describe('AddfriendsPage', () => {
  let component: AddfriendsPage;
  let fixture: ComponentFixture<AddfriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfriendsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddfriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
