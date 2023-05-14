import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movies';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: 'movie-dialog.component.html',
})
export class MovieDialogComponent implements OnInit {
  movieForm!: FormGroup;
  categories: string[] = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi'];
  isNew!: boolean;

  constructor(
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private movie: Movie
  ) { }

  ngOnInit() {
    this.isNew = !this.movie;

    this.movieForm = this.formBuilder.group({
      title: [this.movie?.Title , Validators.required],
      category: [this.movie?.Category, Validators.required],
      rating: [this.movie?.Rating, Validators.required],
    });

    this.movieForm.setValue({
      title: this.movie?.Title || '',
      category: this.movie?.Category || '',
      rating: this.movie?.Rating || '',
    });

    console.log(this.movie);
    console.log(this.isNew);
  }

  onCancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;
      this.dialogRef.close();
    }
  }
}
