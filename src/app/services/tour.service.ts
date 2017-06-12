///<reference path="../../../node_modules/@angular/http/src/http.d.ts"/>
import { Injectable } from '@angular/core';
import {CITIES} from '../data/cities';
import { City } from '../classes/city';
import {Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TourService {

  private url = 'http://localhost:55944/api/RouteQueue';

  constructor(private _http: Http) { }


  getTour(): Observable<City[]> {
    return this._http
      .get(this.url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
