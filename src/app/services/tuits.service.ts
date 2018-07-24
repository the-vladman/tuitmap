import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Tuit } from '../models/tuit';
import { Percent } from '../models/percent';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TuitsService {
  private tuitsUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTotalValues(){
    const values = [];
    let totalColors=['#36039C','#EB675B'];
    return this.http.get<any>(`${this.tuitsUrl}?coordinates.coordinates&pageSize=1`)
      .pipe(
        map(response => response.pagination.total),
        switchMap(total => {
          values.push(new Percent('with-coordinates',total,totalColors[0]))
          return this.http.get<any>(`${this.tuitsUrl}?pageSize=1`)
        }),
        map(response => {
          const total = response.pagination.total;
          values.push(new Percent('total',total,totalColors[0]))
          values.push(new Percent('without-coordinates',total - values[0].total,totalColors[1]))
          return values;
        }),
        catchError(this.handleError('getTotalTuitsWithCoordinates'))
      );
  }

  getTotalCountries(){
    const values = [];
    let countryCodes=['US', 'MX','GT', 'BZ'];
    let countryColors=['#FFB803', '#FA9500','#F64905', '#9D1006'];
    return this.http.get<any>(`${this.tuitsUrl}?place.country_code=${countryCodes[0]}&pageSize=1`)
      .pipe(
        map(response => {
          values.push(new Percent(countryCodes[0],response.pagination.total, countryColors[0]))
        }),
        switchMap(_=> {
          return this.http.get<any>(`${this.tuitsUrl}?place.country_code=${countryCodes[1]}&pageSize=1`)
        }),
        map(response => {
          values.push(new Percent(countryCodes[1],response.pagination.total, countryColors[1]))
        }),
        switchMap(_=> {
          return this.http.get<any>(`${this.tuitsUrl}?place.country_code=${countryCodes[2]}&pageSize=1`)
        }),
        map(response => {
          values.push(new Percent(countryCodes[2],response.pagination.total, countryColors[2]))
        }),
        switchMap(_=> {
          return this.http.get<any>(`${this.tuitsUrl}?place.country_code=${countryCodes[3]}&pageSize=1`)
        }),
        map(response => {
          values.push(new Percent(countryCodes[3],response.pagination.total, countryColors[3]))
          return values;
        }),
        catchError(this.handleError('getTotalCountries'))
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
