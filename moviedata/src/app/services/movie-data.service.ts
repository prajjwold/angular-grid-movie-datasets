import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { filter, mergeMap, map } from 'rxjs/operators';

@Injectable()
export class MovieDataService {

    // private readonly API_URL = 'http://localhost:3200';
    public constructor(private readonly http: HttpClient) {
    }

    public getMovieData(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`/api/movies`);
    }

    public getMovieDataBySearchText(searchText: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`/api/movies`).pipe(
            map((movies: Movie[]) => movies.filter(t =>
                t.actors.includes(searchText) ||
                t.description.includes(searchText) ||
                t.genre.includes(searchText) ||
                t.director.includes(searchText) ||
                t.title.includes(searchText)))
        );
    }
}

