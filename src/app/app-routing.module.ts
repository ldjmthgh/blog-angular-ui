import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from "./pages/login/login.component";
import {ErrorComponent} from "./pages/error/error.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
import {RegisterComponent} from "./pages/register/register.component";
import {MdTrashArticleComponent} from "./pages/index/md-nav/md-trash/md-trash-article/md-trash-article.component";
import {MdTrashImageComponent} from "./pages/index/md-nav/md-trash/md-trash-image/md-trash-image.component";
import {InitGuard} from "./guard/init.guard";
import {IndexComponent} from "./pages/index/index.component";
import {MdArticleComponent} from "./pages/index/md-nav/md-article/md-article.component";
import {MdImageComponent} from "./pages/index/md-nav/md-image/md-image.component";
import {MdTrashComponent} from "./pages/index/md-nav/md-trash/md-trash.component";
import {LoginGuard} from "./guard/login.guard";
import {MdViewerComponent} from "./pages/index/md-viewer/md-viewer.component";
import {MdNavComponent} from "./pages/index/md-nav/md-nav.component";
import {MdEditorComponent} from "./pages/index/md-editor/md-editor.component";
import {SaveArticleGuard} from "./guard/save-article.guard";
import {SelfCenterComponent} from "./pages/index/self-center/self-center.component";
import {BasicInfoComponent} from "./pages/index/self-center/basic-info/basic-info.component";
import {ResetPasswordComponent} from "./pages/index/self-center/reset-password/reset-password.component";
import {ResetEmailComponent} from "./pages/index/self-center/reset-email/reset-email.component";


export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent, canActivate: [InitGuard]},
  {path: 'forgetPassword', component: ForgetPasswordComponent, canActivate: [InitGuard, LoginGuard]},
  {
    path: 'index', component: IndexComponent, canActivate: [InitGuard, LoginGuard], children: [
      {path: '', redirectTo: '/index/mdNav/mdArticle', pathMatch: 'full'},
      {
        path: 'mdNav', component: MdNavComponent, children: [
          {path: '', redirectTo: '/index/mdNav/mdArticle', pathMatch: 'full'},
          {path: 'mdArticle', component: MdArticleComponent},
          {path: 'mdImage', component: MdImageComponent},
          {
            path: 'mdTrash', component: MdTrashComponent, children: [
              {path: '', redirectTo: '/index/mdNav/mdTrash/trashArticle', pathMatch: 'full'},
              {path: 'trashArticle', component: MdTrashArticleComponent},
              {path: 'trashImage', component: MdTrashImageComponent},
            ]
          },
        ]
      },
      {path: 'mdEditor', component: MdEditorComponent, canDeactivate: [SaveArticleGuard]},
      {path: 'mdViewer', component: MdViewerComponent},
      {
        path: 'selfCenter', component: SelfCenterComponent, children: [
          {path: '', redirectTo: '/selfCenter/basicInfo', pathMatch: 'full'},
          {path: 'basicInfo', component: BasicInfoComponent},
          {path: 'resetPwd', component: ResetPasswordComponent},
          {path: 'resetEmail', component: ResetEmailComponent},
        ]
      },
    ]
  },
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
