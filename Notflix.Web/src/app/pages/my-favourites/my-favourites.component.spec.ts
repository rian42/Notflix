import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavouritesComponent } from './my-favourites.component';

describe('MyFavouritesComponent', () => {
  let component: MyFavouritesComponent;
  let fixture: ComponentFixture<MyFavouritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFavouritesComponent]
    });
    fixture = TestBed.createComponent(MyFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
