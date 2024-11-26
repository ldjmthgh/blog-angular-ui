import {Component, OnInit} from '@angular/core';
import {
  emailCheck,
  nickNameCheck,
  UserDTO,
  userNameCheck,
  userPwdCheck,
  userSecPwdCheck
} from "../../models/dto/UserDTO";
import {InputDisplayVO} from "../../models/vo/InputDisplayVO";
import {MessageService} from "../../services/message.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // TODO: 注册动态验证邮箱
  dto: UserDTO = new UserDTO();
  secUserPassword = '';

  passwordVisible = false;
  secPasswordVisible = false;

  // 展示对象
  userNameDV: InputDisplayVO = new InputDisplayVO('3-16个字符，允许字母、数字、下划线，需以字母开头');
  nickNameDV: InputDisplayVO = new InputDisplayVO('昵称限长3-18个字符');
  userPwdDV: InputDisplayVO = new InputDisplayVO('8-16个字符，允许字母、数字、特殊字符，至少包含一个字母、数字和特殊符号');
  emailDV: InputDisplayVO = new InputDisplayVO('限长28个字符，格式：******@****.com');
  secPwdDV: InputDisplayVO = new InputDisplayVO('两次密码不一致');

  constructor(private msgSrv: MessageService,
              private router: Router,
              private userSrv: UserService) {
  }

  async ngOnInit() {
    await this.userSrv.notInit().then(re => {
      // already init
      if (!re.data) {
        this.router.navigate(['/login']);
      }
    });
  }

  checkUserName = () => {
    this.userNameDV = userNameCheck(this.dto.userName, this.userNameDV);
  };

  checkNickName = () => {
    this.nickNameDV = nickNameCheck(this.dto.nickName, this.nickNameDV);
  };

  checkUserPassword = () => {
    this.userPwdDV = userPwdCheck(this.dto.userPassword, this.userPwdDV);
  };

  checkEmail = () => {
    this.emailDV = emailCheck(this.dto.email, this.emailDV);
  };

  checkSecPwd = () => {
    this.secPwdDV = userSecPwdCheck(this.dto.userPassword, this.secUserPassword, this.secPwdDV);
  };

  async submit() {
    this.checkUserName();
    this.checkNickName();
    this.checkEmail();
    this.checkUserPassword();
    this.checkSecPwd();
    if (!this.userNameDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.userNameDV.filterMsg);
      return;
    }
    if (!this.nickNameDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.nickNameDV.filterMsg);
      return;
    }
    if (!this.userPwdDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.userPwdDV.filterMsg);
      return;
    }
    if (!this.emailDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.emailDV.filterMsg);
      return;
    }
    if (!this.secPwdDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.secPwdDV.filterMsg);
      return;
    }
    await this.userSrv.register(this.dto).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('注册成功');
        await this.router.navigate(['/login']);
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

}
