import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const toExclude = "/login";
    const toExcludeRegister = "/register";
    console.log("fsdfsdfsdfsdfsdf" + request.url.search(toExclude) + request.url)
    if (request.url.search(toExclude) === -1 && request.url.search(toExcludeRegister) === -1) {
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone({
        setHeaders: { Authorization: "Bearer " + jwt }
      })
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
}
