import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  // intercepts every request to see if there is a 401 - unauthorized
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();

    return next.handle(request).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        const method = request.urlWithParams.replace(/https?:\/\/.*?\/(.*)/g, '$1');
        // console.log(`elapsed [${elapsed}] ms. ${method}`);
        // console.log(`request '${request.url}' took ${elapsed} ms.`);
        // console.log('[2]reqres =', request.body, event.body.response);
      }
    }, error => {
      // console.error('Request Error!!! ', error);
    }));
  }
}
