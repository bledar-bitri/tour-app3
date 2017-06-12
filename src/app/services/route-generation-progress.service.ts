import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ProgressMessage} from '../classes/progress-message';

@Injectable()
export class RouteGenerationProgressService {

  private url = 'http://localhost:55944/api/routeGenerationProgress';

  constructor(private _http: Http) { }


  getProgress(): Observable<ProgressMessage> {
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
