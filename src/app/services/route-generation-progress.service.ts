import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ProgressMessage} from '../classes/progress-message';

@Injectable()
export class RouteGenerationProgressService {

  private url = 'api/routeGenerationProgress';

  constructor(private _http: HttpClient) { }


  getProgress(): Observable<ProgressMessage> {
    return this._http
      .get<ProgressMessage>(this.url)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
