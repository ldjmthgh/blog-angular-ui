import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {UserService} from "../../services/user.service";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";
import {InputDisplayVO} from "../../models/vo/InputDisplayVO";
import {emailCheck} from "../../models/dto/UserDTO";
import {isNullOrEmpty} from "../../common/StringUtil";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  emailDV: InputDisplayVO = new InputDisplayVO('限长28个字符，格式：******@****.com');
  // 邮箱
  email = '';
  emailCaptchaImgUrl = '';
  captchaCode = '';
  emailUnPassFlag = false;

  constructor(private configSrv: ConfigService,
              private msgSrv: MessageService,
              private router: Router,
              private userSrv: UserService) {
  }

  async ngOnInit() {
    const serverIp = await this.configSrv.getServerIp();
    this.emailCaptchaImgUrl = `${serverIp}/captcha/resource`;
  }


  async resetPwd() {
    this.checkEmail();
    if (!this.emailDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.emailDV.filterMsg);
      return;
    }

    if (isNullOrEmpty(this.captchaCode)) {
      this.msgSrv.sendInfoMsg('请输入验证码');
      return;
    }
    await this.userSrv.resetPwd(this.email, this.captchaCode).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('重置密码成功');
        await this.router.navigate(['/login']);
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async refreshCaptchaImg() {
    const serverIp = await this.configSrv.getServerIp();
    this.emailCaptchaImgUrl = `${serverIp}/captcha/resource`;
  }

  checkEmail = () => {
    this.emailDV = emailCheck(this.email, this.emailDV);
  };


}
