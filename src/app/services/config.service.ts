import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigModel} from "../common/ConfigModel";
import {CommonResponse} from "../common/CommonResponse";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  serverIp!: string;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取模型
   */
  async getConfigModel(): Promise<ConfigModel> {
    return this.httpClient.get<ConfigModel>('/assets/config/Config.json').toPromise();
  }

  /**
   * 获取后端IP
   */
  async getServerIp(): Promise<string> {
    const configModel = await this.getConfigModel();
    return configModel.serverIp;
  }


  /**
   * 获取cdn vditor IP
   */
  async getCdnIp(): Promise<string> {
    const configModel = await this.getConfigModel();
    return configModel.cdnIp;
  }

  /**
   * 获取博客版本
   */
  async getBlogVersion(): Promise<CommonResponse<string>> {
    if (null == this.serverIp) {
      this.serverIp = await this.getServerIp();
    }
    const url = `${this.serverIp}/config/version`;
    return await this.httpClient.get<CommonResponse<string>>(url).toPromise();
  }
}
