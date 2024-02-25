import { Injectable } from '@angular/core';

import {

  HttpEvent,
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,

} from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AppStateService } from '@app-services/app/app.service';
import { AuthenticationService } from '@app-services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  private EXTERNAL_API_IDENTIFIER: string = 'EXTERNAL_API';

  constructor(
    private router: Router,
    private http: HttpClient,
    private appService: AppStateService,
    private authService: AuthenticationService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req.clone({ url: this.getRequestUrl(req) }))
      .pipe(catchError(error => this.handleHttpError(error)),
        finalize(() => this.appService.removeRequestInProgress())
      );
  }

  private getRequestUrl(req: HttpRequest<any>) {
    return this.isExternalRequest(req) ? req.url : this.getInternalApiUrl().concat(req.url)
  }

  public get<T>(url: string, isExternalRequest: boolean = false): Observable<T> {
    return this.performRequest<T>('GET', url, undefined, isExternalRequest);
  }

  public post<T>(url: string, body: object): Observable<T> {
    return this.performRequest<T>('POST', url, body);
  }

  public put<T>(url: string, body: object): Observable<T> {
    return this.performRequest<T>('PUT', url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.performRequest<T>('DELETE', url, undefined);
  }

  private getInternalApiUrl(): string {
    return environment.API_URL ?? (() => { throw new Error("[ PANIC ] No INTERNAL API URL provided."); })();
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    this.appService.removeRequestInProgress();
    return error.status === 0 ? this.handleUnknownError() : this.handleApiError(error);
  }

  private handleUnknownError(): Observable<never> {

    const unknownError = {
      status: 501,
      message: 'Serviço indisponível no momento'
    }

    return throwError(() => (unknownError));
  }

  private handleApiError({ error: { status, message } }: HttpErrorResponse): Observable<never> {

    if (status === 401) {
      this.authService.removeToken();
      this.router.navigate(['/auth']);
    }

    return throwError(() => ({ status, message }));
  }

  private isExternalRequest(req: HttpRequest<any>): boolean {
    return req.headers.get(this.EXTERNAL_API_IDENTIFIER) === 'true';
  }

  private getHeaders(isExternalRequest: boolean = false): HttpHeaders {

    let headers = new HttpHeaders();
    const token = this.authService.getToken();

    if (isExternalRequest) {
      headers = headers.set(this.EXTERNAL_API_IDENTIFIER, 'true');
    }

    if (token) {
      headers = headers.set('Authorization', 'Bearer '.concat(token));
    }

    return headers

  };

  private performRequest<T>(method: string, url: string, body?: object, external: boolean = false): Observable<T> {

    this.appService.addRequestInProgress(true);
    const requestObservable = this.http.request<T>(method, url, { headers: this.getHeaders(external), body });
    return requestObservable.pipe(catchError(error => throwError(() => (error))));
  }

}