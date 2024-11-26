import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MessageService} from "../services/message.service";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class InitGuard implements CanActivate {
  constructor(private router: Router,
              private msgSrv: MessageService,
              private userSrv: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.initApp();
  }

  async initApp(): Promise<boolean> {
    let flag = true;
    await this.userSrv.notInit().then(re => {
      flag = re.data as boolean;
    });
    // true not init
    if (flag) {
      await this.router.navigate(['/register']);
    }
    return !flag;
  }

}
