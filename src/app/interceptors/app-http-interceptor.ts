/**
 * Created by bledi on 10/1/2017.
 */

import {Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    req = req.clone({
      url: environment.url + req.url
    });

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('----> status: ', evt.status);
        console.log('----> filter: ', req.params.get('filter'));
      }
    });

  }
}
