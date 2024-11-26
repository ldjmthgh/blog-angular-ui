import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Router} from '@angular/router';
import {isNullOrEmpty} from "../../common/StringUtil";
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../models/dto/UserDTO";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dto = new UserDTO();

  nameUnPassFlag: boolean = false;
  pwdUnPassFlag: boolean = false;
  loginPassFlag = true;
  passwordVisible = false;

  constructor(private msgSrv: MessageService,
              private userSrv: UserService,
              private cookieSrv: CookieService,
              private router: Router) {
  }

  async ngOnInit() {
    // 判断是否已经登录
    const authentication = localStorage.getItem('Authentication') as string;
    if (!isNullOrEmpty(authentication)) {
      await this.userSrv.checkAuthentication().then(async re => {
          if (re.code > 0) {
            await this.router.navigate(['/index/mdNav/mdArticle']);
          }
      });
    }
  }


  filterName = () => {
    this.nameUnPassFlag = isNullOrEmpty(this.dto.userName);
    this.loginPassFlag = isNullOrEmpty(this.dto.userName) || isNullOrEmpty(this.dto.userName);
  };

  filterPwd = () => {
    this.pwdUnPassFlag = isNullOrEmpty(this.dto.userName);
    this.loginPassFlag = isNullOrEmpty(this.dto.userName) || isNullOrEmpty(this.dto.userName);
  };

  async login() {
    await this.userSrv.login(this.dto).then(re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('登录成功');
        localStorage.setItem('Authentication', re.data);
        this.router.navigate(['/index']);
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async forgetPwd() {
    await this.router.navigate(['/forgetPassword']);
  }

}
