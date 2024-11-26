import {Component, OnInit} from '@angular/core';
import {ImageVO} from "../../../../../models/vo/ImageVO";
import {Router} from "@angular/router";
import {ConfigService} from "../../../../../services/config.service";
import {ImageService} from "../../../../../services/image.service";
import {MessageService} from "../../../../../services/message.service";
import {IPageQueryItem} from "../../../../../models/IPageQueryItem";
import {isNullOrUndefined} from "../../../../../common/StringUtil";
import {TrashService} from "../../../../../services/trash.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-md-trash-image',
  templateUrl: './md-trash-image.component.html',
  styleUrls: ['./md-trash-image.component.css']
})
export class MdTrashImageComponent implements OnInit {

  imageList: ImageVO[] = []; // 后端分页
  totalSize: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  searchKey = '';
  queryItem = new IPageQueryItem(1, 10);
  // 存储选择ID
  selectedIdSet = new Set<number>();
  // 是否本页全选
  checked = false;
  indeterminate = false;

  constructor(
    public router: Router,
    private trashSrv: TrashService,
    private configSrv: ConfigService,
    private imageSrv: ImageService,
    public msgSrv: MessageService) {
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
    await this.trashSrv.getImagePageList(this.queryItem).then((re) => {
      if (!isNullOrUndefined(re) && re.code > 0) {
        this.imageList = re.data.records;
        this.totalSize = re.data.total;
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async delete(id: number) {
    const ids: string[] = [];
    ids.push(id + '');
    await this.imageSrv.deleteBatch(JSON.stringify(ids)).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('数据删除成功');
        await this.clearStatus();
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async recovery(id: number) {
    const ids: string[] = [];
    ids.push(id + '');
    await this.trashSrv.recoveryImage(JSON.stringify(ids)).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('数据恢复成功');
        await this.clearStatus();
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }


  // 批量删除
  async deleteBatch() {
    if (this.selectedIdSet.size < 1) {
      this.msgSrv.sendInfoMsg('暂未选择数据');
      return;
    }
    await this.imageSrv.deleteBatch(JSON.stringify(this.selectedIdSet)).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('数据删除成功');
        await this.clearStatus();
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  // 批量恢复
  async recoveryBatch() {
    if (this.selectedIdSet.size < 1) {
      this.msgSrv.sendInfoMsg('暂未选择数据');
      return;
    }
    await this.trashSrv.recoveryImage(JSON.stringify(this.selectedIdSet)).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('数据恢复成功');
        await this.clearStatus();
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  // 删除所有
  async deleteAll() {
    if (this.imageList.length < 1) {
      this.msgSrv.sendInfoMsg('暂无数据');
      return;
    }
    await this.imageSrv.deleteAll().then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('数据删除成功');
        await this.clearStatus();
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  // 恢复所有
  async recoveryAll() {
    if (this.imageList.length < 1) {
      this.msgSrv.sendInfoMsg('暂无数据');
      return;
    }
    await this.imageSrv.recoveryAll().then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendInfoMsg('数据恢复成功');
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
    this.selectedIdSet.clear();
    this.getImagePageData();
  }

  // 选择框 变化
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.selectedIdSet.add(id);
    } else {
      this.selectedIdSet.delete(id);
    }
  }

  // 点击 选择框事件
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  // 刷新全选框状态
  refreshCheckedStatus(): void {
    this.checked = this.imageList.every(img => this.selectedIdSet.has(img.imageId));
    this.indeterminate = this.imageList.some(img => this.selectedIdSet.has(img.imageId)) && !this.checked;
  }

  // 全选框点击事件
  onAllChecked(checked: boolean): void {
    this.imageList.forEach(img => this.updateCheckedSet(img.imageId, checked));
    this.refreshCheckedStatus();
  }




}
