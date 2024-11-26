import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "../common/StringUtil";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authentication = localStorage.getItem('Authentication');
    if (!isNullOrUndefined(authentication)) {
      // 携带授权头
      req = req.clone({setHeaders: {Authentication: authentication as string}});
    }
    return next.handle(req);
  }
}
