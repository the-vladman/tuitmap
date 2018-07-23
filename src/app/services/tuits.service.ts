import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Tuit } from '../models/tuit';

@Injectable({
  providedIn: 'root'
})
export class TuitsService {
  private tuitsUrl = 'https://api.datos.gob.mx/v2/tuits';
  // private tuitsUrl = 'https://api.datos.gob.mx/v2/tuits?coordinates.coordinates';
  constructor(private http: HttpClient) { }

  getTotalTuits(){
    return this.http.get(`${this.tuitsUrl}?pageSize=1`)
      .pipe(
        map(response => response.pagination.total),
        catchError(this.handleError('getTotalTuits'))
      );
  }

  getTotalTuitsWithCoordinates(){
    return this.http.get(`${this.tuitsUrl}?coordinates.coordinates&pageSize=1`)
      .pipe(
        map(response => response.pagination.total),
        catchError(this.handleError('getTotalTuitsWithCoordinates'))
      );
  }
  
  getTuits (): Observable<Tuit[]> {
    const tuits = [];
    const totalTuits = [];
    return this.http.get(`${this.tuitsUrl}?coordinates.coordinates&pageSize=1`)
      .pipe(
        map(response => response.pagination.total),
        switchMap(total => {
          return this.http.get(`${this.tuitsUrl}?coordinates.coordinates&pageSize=${total}`)
        }),
        map(response => {
          response.results.forEach(result => {
            if (result.coordinates) {
              tuits.push(new Tuit(result))
            }
          });
          return tuits;
        }),
        catchError(this.handleError('getTuits', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('ERROR JJS',error);
      return of(result as T);
    };
  }
}
