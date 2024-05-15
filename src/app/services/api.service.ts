import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    const cacheKey = `user-${username}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get(`https://api.github.com/users/${username}`).pipe(
        tap(data => this.cache.set(cacheKey, data)),
        catchError(this.handleError<any>('getUser'))
      );
    }
  }

  getRepos(username: string, page: number, per_page: number): Observable<any[]> {
    const cacheKey = `repos-${username}-${page}-${per_page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get<any[]>(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`).pipe(
        tap(data => this.cache.set(cacheKey, data)),
        catchError(this.handleError<any[]>('getRepos', []))
      );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
