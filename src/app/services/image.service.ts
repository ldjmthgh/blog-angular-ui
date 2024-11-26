import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {isNullOrEmpty} from '../common/StringUtil';
import {CommonResponse} from '../common/CommonResponse';
import {IPageQueryItem} from '../models/IPageQueryItem';
import {MyPage} from '../models/MyPage';
import {ImageVO} from "../models/vo/ImageVO";
import {ImageDTO} from "../models/dto/ImageDTO";

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  serverIp!: string;

  constructor(
    private configSrv: ConfigService,
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
   * 新增
   * @param data 文章数据
   */
  async insert(data: ImageDTO): Promise<CommonResponse<number>> {
    await this.testServerIp();
    const url = `${this.serverIp}/image`;
    return await this.httpClient.post<CommonResponse<number>>(url, data).toPromise();
  }

  /**
   * 上传文件
   * @param id 图片ID
   * @param data formData
   */
  async upload(id: number, data: FormData): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/image/upload?id=${id}`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 后端分页查询
   * @param queryKey
   */
  async getPageList(queryKey: IPageQueryItem): Promise<CommonResponse<MyPage<ImageVO>>> {
    await this.testServerIp();
    const url = `${this.serverIp}/image/page`;
    return await this.httpClient
      .post<CommonResponse<MyPage<ImageVO>>>(url, queryKey)
      .toPromise();
  }

  /**
   * 彻底删除 数据
   * @param ids
   */
  async deleteBatch(ids: string): Promise<CommonResponse<Boolean>> {
    const data = new FormData();
    data.append('ids', ids);
    await this.testServerIp();
    const url = `${this.serverIp}/image/delete`;
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
    const url = `${this.serverIp}/image/remove`;
    return await this.httpClient.post<CommonResponse<Boolean>>(url, data).toPromise();
  }

  /**
   * 恢复所有
   *
   * @return 三段式返回
   */
  async recoveryAll(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/image/all/remove`;
    return await this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 删除所有废弃
   *
   * @return 三段式返回
   */
  async deleteAll(): Promise<CommonResponse<Boolean>> {
    await this.testServerIp();
    const url = `${this.serverIp}/image/all/delete`;
    return await this.httpClient.get<CommonResponse<Boolean>>(url).toPromise();
  }

  /**
   * 获取下载图片路径前缀
   */
  async getImageSuffixUrl(): Promise<string> {
    await this.testServerIp();
    return `${this.serverIp}/image/download?id=`;
  }
}
