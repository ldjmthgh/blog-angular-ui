import {Component, OnInit} from '@angular/core';
import {ImageVO} from "../../../../models/vo/ImageVO";
import {Router} from "@angular/router";
import {NzImageService} from "ng-zorro-antd/image";
import {MessageService} from "../../../../services/message.service";
import {ConfigService} from "../../../../services/config.service";
import {ImageService} from "../../../../services/image.service";
import {IPageQueryItem} from "../../../../models/IPageQueryItem";
import {isNullOrUndefined} from "../../../../common/StringUtil";
import {NzImage} from "../../../../models/NzImage";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-md-image',
  templateUrl: './md-image.component.html',
  styleUrls: ['./md-image.component.css']
})
export class MdImageComponent implements OnInit {

  imageList: ImageVO[] = []; // 后端分页
  totalSize: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  searchKey = '';
  queryItem = new IPageQueryItem(1, 10);

  constructor(
    public router: Router,
    private clipBoard: Clipboard,
    private configSrv: ConfigService,
    private imageSrv: ImageService,
    private nzImageService: NzImageService,
    public msgSrv: MessageService
  ) {
  }

  async ngOnInit() {
    await this.getImagePageData();
  }

  async pageEvent(event: NzTableQueryParams) {
    this.queryItem.startIndex = event.pageIndex;
    await this.getImagePageData();
  }

  searchPage = async () => {
    this.queryItem.searchKey = this.searchKey;
    await this.getImagePageData();
  };

  async getImagePageData() {
    await this.imageSrv.getPageList(this.queryItem).then(async (re) => {
      if (!isNullOrUndefined(re) && re.code > 0) {
        this.imageList = re.data.records;
        this.totalSize = re.data.total;
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  viewImage(vo: ImageVO) {
    this.imageSrv.getImageSuffixUrl().then((re) => {
      const img = new NzImage();
      img.width = '200px';
      img.height = '200px';
      img.src = re + vo.imageId;
      img.alt = vo.imageName;
      const imgArr = [];
      imgArr.push(img);
      this.nzImageService.preview(imgArr, {nzZoom: 1.5, nzRotate: 0});
    });
  }

  async copyUrl(vo: ImageVO) {
    const suffix = await this.imageSrv.getImageSuffixUrl() + vo.imageId;
    await this.clipBoard.copy(suffix);
    this.msgSrv.sendSuccessMsg('复制成功');
  }

  async removeImage(vo: ImageVO) {
    const ids = [];
    ids.push(vo.imageId);
    this.imageSrv.removeBatch(JSON.stringify(ids)).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('图片已移入回收站');
        await this.clearStatus();
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async clearStatus() {
    this.totalSize = 0;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.searchKey = '';
    this.queryItem = new IPageQueryItem(1, 10);
    await this.getImagePageData();
  }

}
