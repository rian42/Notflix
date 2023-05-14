import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDialogComponent } from './movie-dialog.component';

describe('MovieDialogComponentComponent', () => {
  let component: MovieDialogComponent;
  let fixture: ComponentFixture<MovieDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieDialogComponent]
    });
    fixture = TestBed.createComponent(MovieDialogComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
