import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Tuit } from '../models/tuit';
import { Percent } from '../models/percent';

@Injectable({
  providedIn: 'root'
})
export class TuitsService {
  private tuitsUrl = 'https://api.datos.gob.mx/v2/tuits';
  // private tuitsUrl = 'https://api.datos.gob.mx/v2/tuits?coordinates.coordinates';
  constructor(private http: HttpClient) { }

  getTotalValues(){
    const values = [];
    return this.http.get<any>(`${this.tuitsUrl}?coordinates.coordinates&pageSize=1`)
      .pipe(
        map(response => response.pagination.total),
        switchMap(total => {
          values.push(new Percent('with-coordinates',total))
          return this.http.get<any>(`${this.tuitsUrl}?pageSize=1`)
        }),
        map(response => {
          const total = response.pagination.total;
          values.push(new Percent('total',total))
          values.push(new Percent('without-coordinates',total - values[0].total))
          return values;
        }),
        catchError(this.handleError('getTotalTuitsWithCoordinates'))
      );
  }

  getTuits (): Observable<Tuit[]> {
    const tuits = [];
    return this.http.get<any>(`${this.tuitsUrl}?coordinates.coordinates&pageSize=1`)
      .pipe(
        map(response => response.pagination.total),
        switchMap(total => {
          return this.http.get<any>(`${this.tuitsUrl}?coordinates.coordinates&pageSize=${total}`)
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
