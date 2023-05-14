import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subject, Subscription, debounceTime } from 'rxjs';
import { Movie } from 'src/app/models/movies';
import { MovieApiService } from 'src/app/services/movies/movie-api.service';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy{
  private _moviesApi = inject(MovieApiService);
  private _searchSubject: Subject<string> = new Subject<string>();
  private _searchSubscription!: Subscription;
  private _dialog = inject(MatDialog);
  movies: Movie[] = [];
  allMovies: Movie[] = [];
  rowData$!: Observable<Movie[]>;
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
    this.loadMovies();
    this._searchSubscription = this._searchSubject
      .pipe(debounceTime(300))
      .subscribe((searchTerm: string) => {
        this.applyFilter(searchTerm);
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the search subscription to avoid memory leaks
    this._searchSubscription.unsubscribe();
  }

  // Triggered when the search input value changes
  onSearchChange(searchValue: string) {
    this._searchSubject.next(searchValue);
  }

  loadMovies() {
    this.rowData$ = this._moviesApi.getMovies();
    this.rowData$.subscribe((movies) => {
      this.movies = movies;
      this.allMovies = movies;
    })
  }

  applyFilter(searchTerm: string) {
    if (searchTerm.trim()) {      
      const filteredMovies = this.allMovies.filter((movie: Movie) =>
        movie.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
        ||
        movie.Category.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.movies = filteredMovies;
    }
    else {
      this.movies = this.allMovies;
    }
  }

  onEditClicked(rowData: any): void {
    console.log('Edit clicked:', rowData);
  }

  onDeleteClicked(rowData: any): void {
    // handle delete button click
    console.log('Delete clicked:', rowData);
  }

  openMovieDialog(movie?: Movie): void {
    const dialogRef = this._dialog.open(MovieDialogComponent, {
      width: '400px',
      data: { movie: movie, dialogTitle: movie ? 'Edit Movie' : 'Add Movie' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the dialog close event here
      console.log('Dialog closed', result);
    });
  }
}

