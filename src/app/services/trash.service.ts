import {Injectable} from '@angular/core';
import {IPageQueryItem} from "../models/IPageQueryItem";
import {MyPage} from "../models/MyPage";
import {CommonResponse} from "../common/CommonResponse";
import {isNullOrEmpty} from "../common/StringUtil";
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {ArticleVO} from "../models/vo/ArticleVO";
import {ImageVO} from "../models/vo/ImageVO";

@Injectable({
  providedIn: 'root'
})
export class TrashService {
  serverIp!: string;

  constructor(private configSrv: ConfigService,
              private httpClient: HttpClient) {
    this.configSrv.getServerIp().then(re => {
      this.serverIp = re;
    });
  }

  async testServerIp() {
    if (isNullOrEmpty(this.serverIp)) {
      this.serverIp = await this.configSrv.getServerIp();
    }
  }

  /**
   * 后端分页查询
   * @param queryKey
   */
  async getArticlePageList(queryKey: IPageQueryItem): Promise<CommonResponse<MyPage<ArticleVO>>> {
    await this.testServerIp();
    const url = `${this.serverIp}/trash/page/article`;
    return await this.httpClient.post<CommonResponse<MyPage<ArticleVO>>>(url, queryKey).toPromise();
  }

  /**
   * 后端分页查询
   * @param queryKey
   */
  async getImagePageList(queryKey: IPageQueryItem): Promise<CommonResponse<MyPage<ImageVO>>> {
    await this.testServerIp();
    const url = `${this.serverIp}/trash/page/image`;
    return await this.httpClient.post<CommonResponse<MyPage<ImageVO>>>(url, queryKey).toPromise();
  }

  /**
   * 从回收站恢复
   * @param ids
   */
  async recoveryArticle(ids: string): Promise<CommonResponse<Boolean>> {
    const data = new FormData();
    data.append('ids', ids);
    data.append('flag', 'false');
    await this.testServerIp();
    const url = `${this.serverIp}/article/remove`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 从回收站恢复
   * @param ids
   */
  async recoveryImage(ids: string): Promise<CommonResponse<Boolean>> {
    const data = new FormData();
    data.append('ids', ids);
    data.append('flag', 'false');
    await this.testServerIp();
    const url = `${this.serverIp}/image/remove`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }
}
