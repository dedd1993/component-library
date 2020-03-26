import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, filter, take } from 'rxjs/operators';

import { HttpApi } from './http-api';
import { AuthService } from '../services/auth.service';

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {
  refreshTokenInProgress: boolean;
  refreshTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
    .handle(this.performRequest(req))
    .pipe(
      catchError((err) => this.processRequestError(err, req, next))
    );
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;

    if (this.isAuthenticationRequired(req.url)) {
        headers = headers.set('Authorization', `Bearer ${this.authService.accessToken}`);
    }

    return req.clone({ headers });
  }

  private processRequestError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return throwError(error);
}

  // Helpers and Casuistics
  private isAuthenticationRequired(apiUrl: string): boolean {
    const blockedApiList = [HttpApi.oauthLogin];
    return blockedApiList.includes(apiUrl) ? false : true;
  }

}
