import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap, timeout} from "rxjs/operators";
import {MessageService} from "../services/message.service";
import {isNullOrUndefined} from "../common/StringUtil";
import {Router} from "@angular/router";

const DEFAULT_TIMEOUT_MILLI_SECONDS = 8000;

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private msgSrv: MessageService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(DEFAULT_TIMEOUT_MILLI_SECONDS),
      tap(
        // 刷新授权
        event => {
          if (event instanceof HttpResponse) {
            const authentication = event.headers.get('Authentication');
            const oldAuthentication = localStorage.getItem('Authentication');
            if (!isNullOrUndefined(authentication) && authentication !== oldAuthentication) {
              localStorage.setItem('Authentication', authentication as string);
            }
          }
        }
      ),
      catchError((err, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (!isNullOrUndefined(err.error.msg)) {
            this.msgSrv.sendErrorMsg(err.error.msg);
          } else {
            this.msgSrv.sendErrorMsg(err.message);
          }
          if (err.status === 401) {
            localStorage.removeItem('Authentication');
            this.router.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    );
  }
}
