import {Injectable} from '@angular/core';
import {CommonResponse} from "../common/CommonResponse";
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {isNullOrEmpty} from "../common/StringUtil";
import {UserDTO} from "../models/dto/UserDTO";
import {CookieService} from "ngx-cookie-service";
import {UserVO} from "../models/vo/UserVO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverIp!: string;

  constructor(
    private configSrv: ConfigService,
    private cookieSrv: CookieService,
    private httpClient: HttpClient) {
    this.configSrv.getServerIp().then((re) => {
      this.serverIp = re;
    });
  }

  async testServerIp() {
    if (isNullOrEmpty(this.serverIp)) {
      this.serverIp = await this.configSrv.getServerIp();
    }
  }

  /**
   * 登录
   * @param dto 用户数据
   */
  async login(dto: UserDTO): Promise<CommonResponse<string>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/login`;
    return this.httpClient.post<CommonResponse<string>>(url, dto).toPromise();
  }

  /**
   * 注销
   */
  async logout(name: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/logout?name=${name}`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 邮件重置密码
   * @param email 邮箱
   * @param code  验证码
   */
  async resetPwd(email: string, code: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/email/reset?email=${email}&code=${code}`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 注册
   * @param dto 用户数据
   */
  async register(dto: UserDTO): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/register`;
    return this.httpClient.post<CommonResponse<Boolean>>(url, dto).toPromise();
  }

  /**
   * 判断是否需要初始化用户
   */
  async notInit(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/init`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(): Promise<CommonResponse<UserVO>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/info`;
    return this.httpClient.get<CommonResponse<UserVO>>(url).toPromise();
  }

  /**
   * 登录后重置密码
   * @param oldPwd 原密码
   * @param newPwd 新密码
   */
  async resetPwdByOldPwd(oldPwd: string, newPwd: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/password`;
    const data = new FormData();
    data.append('oldPwd', oldPwd);
    data.append('newPwd', newPwd);
    return this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 更改头像
   * @param data
   */
  async changeAvatar(data: FormData): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/avatar`;
    return this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 获取下载图片路径
   */
  async getChangeAvatarUrl(id: number): Promise<string> {
    await this.testServerIp();
    return `${this.serverIp}/user/download?id=${id}`;
  }

  /**
   * 更改用户名
   */
  async changeUserName(name: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/userName?name=${name}`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 更改昵称
   */
  async changeNickName(name: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/nickName?name=${name}`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 发送邮件验证码
   */
  async senEmailCode(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/email/common`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }


  /**
   * 更改邮箱地址
   */
  async changeEmail(code: string, email: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/nickName?code=${code}&email=${email}`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 备份文件
   */
  async backup(): Promise<Blob> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/backup`;
    return this.httpClient.get(url, {responseType: 'blob'}).toPromise();
  }

  /**
   * 恢复数据
   * @param data
   */
  async recovery(data: FormData): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/recovery`;
    return this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 验证授权是否有效
   */
  async checkAuthentication(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/user/check/authentication`;
    return this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }
}
