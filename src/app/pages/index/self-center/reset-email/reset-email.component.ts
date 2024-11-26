import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../../services/message.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {emailCheck} from "../../../../models/dto/UserDTO";
import {InputDisplayVO} from "../../../../models/vo/InputDisplayVO";
import {isNullOrEmpty} from "../../../../common/StringUtil";

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {
  newEmail = '';
  captchaCode = '';

  userEmail = '';
  emailDV: InputDisplayVO = new InputDisplayVO('限长28个字符，格式：******@****.com');

  constructor(public msgSrv: MessageService,
              private router: Router,
              private userSrv: UserService) {
  }

  async ngOnInit() {
    await this.userSrv.getUserInfo().then(async re => {
      if (null !== re && re.code > 0) {
        this.userEmail = re.data.email;
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async refreshCaptchaCode() {
    await this.userSrv.senEmailCode().then(re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('邮件发送成功');
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async resetEmail() {
    this.checkEmail();
    if (!this.emailDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.emailDV.filterMsg);
      return;
    }
    if (isNullOrEmpty(this.captchaCode)) {
      this.msgSrv.sendInfoMsg('请输入验证码');
      return;
    }
    await this.userSrv.changeEmail(this.captchaCode, this.newEmail).then(re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('邮箱地址更改成功');
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  checkEmail = () => {
    this.emailDV = emailCheck(this.newEmail, this.emailDV);
  };
}
