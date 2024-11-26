import {Component, OnInit} from '@angular/core';
import {InputDisplayVO} from "../../../../models/vo/InputDisplayVO";
import {userPwdCheck, userSecPwdCheck} from "../../../../models/dto/UserDTO";
import {isNullOrEmpty} from "../../../../common/StringUtil";
import {MessageService} from "../../../../services/message.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passWord: string = '';
  newPwd = '';
  secNewPwd = '';

  oldPasswordVisible = false;
  passwordVisible = false;
  secPasswordVisible = false;

  oldPwdDV: InputDisplayVO = new InputDisplayVO('请输入原密码，长度不低于6个字符');
  userPwdDV: InputDisplayVO = new InputDisplayVO('8-16个字符，允许字母、数字、特殊字符，至少包含一个字母、数字和特殊符号');
  secPwdDV: InputDisplayVO = new InputDisplayVO('两次密码不一致');

  constructor(private msgSrv: MessageService,
              private router: Router,
              private userSrv: UserService) {
  }

  ngOnInit(): void {
  }

  checkUserPassword = () => {
    this.userPwdDV = userPwdCheck(this.newPwd, this.userPwdDV);
  };

  checkSecPwd = () => {
    this.secPwdDV = userSecPwdCheck(this.newPwd, this.secNewPwd, this.secPwdDV);
  };

  checkOldPwd = () => {
    if (!isNullOrEmpty(this.passWord) && this.passWord.length > 6) {
      this.oldPwdDV.passFlag = true;
      return;
    }
    this.oldPwdDV.passFlag = false;
  };

  async resetPwd() {
    this.checkOldPwd();
    this.checkUserPassword();
    this.checkSecPwd();
    if (!this.oldPwdDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.oldPwdDV.filterMsg);
      return;
    }

    if (!this.userPwdDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.userPwdDV.filterMsg);
      return;
    }

    if (!this.secPwdDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.secPwdDV.filterMsg);
      return;
    }
    await this.userSrv.resetPwdByOldPwd(this.passWord, this.newPwd).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('重置密码成功');
        localStorage.clear();
        await this.router.navigate(['/login']);
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

}
