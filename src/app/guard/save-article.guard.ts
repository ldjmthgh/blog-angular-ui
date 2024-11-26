import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MdEditorComponent} from "../pages/index/md-editor/md-editor.component";

@Injectable({
  providedIn: 'root'
})
export class SaveArticleGuard implements CanDeactivate<MdEditorComponent> {
  constructor(public router: Router) {

  }

  canDeactivate(
    component: MdEditorComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.shouldSaveFlag) {
      component.nextRouter = nextState.url;
      component.saveWhileLeave();
    }
    return !component.shouldSaveFlag;
  }
}
