import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {isNullOrUndefined} from "../common/StringUtil";
import {MessageService} from "../services/message.service";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router,
              private msgSrv: MessageService,
              private userSrv: UserService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStatusCheck();
  }

  async loginStatusCheck(): Promise<boolean> {
    const authentication = localStorage.getItem('Authentication');
    if (isNullOrUndefined(authentication)) {
      this.msgSrv.sendWarnMsg('授权失效');
      await this.router.navigate(['/login']);
      return false;
    }
    // TODO: 考虑是否需要 向后台验证是否有效
    return true;
  }

}
