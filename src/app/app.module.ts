import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {NgZorroModule} from "./modules/ng-zorro.module";
import {ErrorComponent} from "./pages/error/error.component";
import {LoginComponent} from "./pages/login/login.component";
import {AppInputDebounceDirective} from "./directive/app-input-debounce.directive";
import {IndexComponent} from './pages/index/index.component';
import {MdArticleComponent} from './pages/index/md-nav/md-article/md-article.component';
import {MdImageComponent} from './pages/index/md-nav/md-image/md-image.component';
import {MdTrashComponent} from './pages/index/md-nav/md-trash/md-trash.component';
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
import {RegisterComponent} from './pages/register/register.component';
import {MdTrashImageComponent} from './pages/index/md-nav/md-trash/md-trash-image/md-trash-image.component';
import {MdTrashArticleComponent} from './pages/index/md-nav/md-trash/md-trash-article/md-trash-article.component';
import {CookieService} from "ngx-cookie-service";
import {ResponseInterceptor} from "./interceptor/ResponseInterceptor";
import {AuthenticationInterceptor} from "./interceptor/AuthenticationInterceptor";
import {MdViewerComponent} from './pages/index/md-viewer/md-viewer.component';
import {MdNavComponent} from './pages/index/md-nav/md-nav.component';
import {MdEditorComponent} from "./pages/index/md-editor/md-editor.component";
import {SelfCenterComponent} from './pages/index/self-center/self-center.component';
import {BasicInfoComponent} from './pages/index/self-center/basic-info/basic-info.component';
import {ResetPasswordComponent} from './pages/index/self-center/reset-password/reset-password.component';
import {ResetEmailComponent} from './pages/index/self-center/reset-email/reset-email.component';
import {ClipboardModule} from "@angular/cdk/clipboard";


@NgModule({
  declarations: [
    // 指令
    AppInputDebounceDirective,

    // 组件
    AppComponent,
    ErrorComponent,
    LoginComponent,
    IndexComponent,
    MdArticleComponent,
    MdImageComponent,
    MdTrashComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    MdTrashImageComponent,
    MdTrashArticleComponent,
    MdEditorComponent,
    MdViewerComponent,
    MdNavComponent,
    SelfCenterComponent,
    BasicInfoComponent,
    ResetPasswordComponent,
    ResetEmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
