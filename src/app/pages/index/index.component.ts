import {Component, OnInit} from '@angular/core';
import {isNullOrEmpty, isNullOrUndefined} from "../../common/StringUtil";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserVO} from "../../models/vo/UserVO";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  version = 'v0.0.1';
  userName: string = '';
  user = new UserVO();
  constructor(public msgSrv: MessageService,
              private router: Router,
              private userSrv: UserService) {
    this.user.avatarHttpUrl = 'assets/img/avatar.png';
  }

  async ngOnInit() {
    // 初始化用户信息
    await this.userSrv.getUserInfo().then(async re => {
      if (null !== re && re.code > 0) {
        this.user = re.data;
        await this.userSrv.getChangeAvatarUrl(this.user.userId).then(re => {
          this.user.avatarHttpUrl = re;
        });
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
        this.logout();
      }
    });
  }

  avatarLoadError() {
    if (isNullOrUndefined(this.user)) {
      this.user = new UserVO();
    }
    if (isNullOrEmpty(this.user.avatarHttpUrl)) {
      this.user.avatarHttpUrl = 'assets/img/avatar.png';
    }
  }

  async mvToSelfInfo() {
    await this.router.navigate(['/index/selfCenter/basicInfo']);
  }

  async mvToIndex() {
    await this.router.navigate(['/index']);
  }

  logout() {
    this.userSrv.logout(this.userName).then(async () => {
      this.msgSrv.sendInfoMsg('已注销登录');
      await this.router.navigate(['/login']);
    });
  }
}
