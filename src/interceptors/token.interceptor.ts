import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public storage: Storage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.storage.get("token"))
    .mergeMap(token => {
      let newRequest;
      if(token) {
        newRequest = req.clone({
          setHeaders: {
            "Authorization": `Bearer ${token}`
          }
        });
      } else {
        newRequest = req.clone();
      }
      return next.handle(newRequest);
    });
  }
}
