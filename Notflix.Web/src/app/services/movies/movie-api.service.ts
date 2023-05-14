import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private apiUrl = 'https://localhost:7046';
  private _http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  getMovies() : Observable<Movie[]> {
    return this._http.get<Movie[]>(`${this.apiUrl}/api/movies`);
  }

  MovieExists(title: string) {
    return this._http.post<boolean>(`${this.apiUrl}/api/movies`, title);
  }
  // get movies
  // get movie
  // add movie
  // delete movie
  // update movie


  getSomeData() {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }

  postSomeData(data: any) {
    return this.http.post(`${this.apiUrl}/endpoint`, data);
  }

  // Add more methods for other API requests as needed
}
