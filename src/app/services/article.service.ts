import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {isNullOrEmpty} from "../common/StringUtil";
import {CommonResponse} from "../common/CommonResponse";
import {ArticleDTO} from "../models/dto/ArticleDTO";
import {ArticleVO} from "../models/vo/ArticleVO";
import {MyPage} from "../models/MyPage";
import {IPageQueryItem} from "../models/IPageQueryItem";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
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
   * 插入数据
   * @param data
   */
  async insert(data: ArticleDTO): Promise<CommonResponse<number>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article`;
    return await this.httpClient.post<CommonResponse<number>>(url, data).toPromise();
  }

  /**
   * 上传文件
   * @param id 文档ID
   * @param data formData
   */
  async upload(id: number, data: FormData): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/upload?id=${id}`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 彻底删除 数据
   * @param ids
   */
  async deleteBatch(ids: string): Promise<CommonResponse<Boolean>> {
    const data = new FormData();
    data.append('ids', ids);
    await this.testServerIp();
    const url = `${this.serverIp}/article/delete`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 批量移入回收站 数据
   * @param ids
   */
  async removeBatch(ids: string): Promise<CommonResponse<Boolean>> {
    const data = new FormData();
    data.append('ids', ids);
    data.append('flag', 'true');
    await this.testServerIp();
    const url = `${this.serverIp}/article/remove`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }


  /**
   * 更新
   * @param id
   * @param data
   */
  async update(id: number, data: ArticleDTO): Promise<CommonResponse<boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article?id=${id}`;
    return await this.httpClient.put<CommonResponse<boolean>>(url, data).toPromise();
  }

  /**
   * 发布 取消发布
   * @param id
   */
  async publish(id: number): Promise<CommonResponse<boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/publish?id=${id}`;
    return await this.httpClient.get<CommonResponse<boolean>>(url).toPromise();
  }

  /**
   * 查询
   * @param id
   */
  async select(id: number): Promise<CommonResponse<ArticleVO>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article?id=${id}`;
    return await this.httpClient.get<CommonResponse<ArticleVO>>(url).toPromise();
  }


  /**
   * 恢复所有
   *
   * @return 三段式返回
   */
  async recoveryAll(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/all/remove`;
    return await this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 删除所有废弃
   *
   * @return 三段式返回
   */
  async deleteAll(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/all/delete`;
    return await this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 后端查询
   */
  async getPageList(key: IPageQueryItem): Promise<CommonResponse<MyPage<ArticleVO>>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/page`;
    return await this.httpClient.post<CommonResponse<MyPage<ArticleVO>>>(url, key).toPromise();
  }

  /**
   * 验重
   * @param name
   */
  async checkTitleName(name: string): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/db/repeat/articleName?name=${name}`;
    return await this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 获取文本内容
   * @param id
   */
  async getMdArticleContent(id: number): Promise<CommonResponse<string>> {
    await this.testServerIp();
    const url = `${this.serverIp}/article/content?id=${id}`;
    return await this.httpClient.get<CommonResponse<string>>(url).toPromise();
  }

  /**
   * 更新文本内容
   * @param id
   * @param content
   */
  async updateMdArticleContent(id: number, content: string): Promise<CommonResponse<string>> {
    await this.testServerIp();
    const data = new FormData();
    data.append('id', id + '');
    data.append('content', content);
    const url = `${this.serverIp}/article/update/content`;
    return await this.httpClient.post<CommonResponse<string>>(url, data).toPromise();
  }
}
