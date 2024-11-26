import {Injectable} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private messageSrv: NzMessageService,
              private notificationSrv: NzNotificationService) {
  }

  public sendInfoMsg(msg: string, lifeNum = 2000): void {
    this.messageSrv.info(msg, {
      nzDuration: lifeNum
    });
  }

  public sendWarnMsg(msg: string, lifeNum = 2500): void {
    this.messageSrv.warning(msg, {
      nzDuration: lifeNum
    });
  }

  public sendSuccessMsg(msg: string, lifeNum = 2000): void {
    this.messageSrv.success(msg, {
      nzDuration: lifeNum
    });
  }

  public sendErrorMsg(msg: string, lifeNum = 3000): void {
    this.messageSrv.error(msg, {
      nzDuration: lifeNum
    });
  }

  public addLoading(msg: string): string {
    return this.messageSrv.loading(msg, {nzDuration: 0}).messageId;
  }

  public rmLoading(id: string): void {
    this.messageSrv.remove(id);
  }

  public putInfoMsg(msg: string, titleName = '提示', lifeNum = 2000): void {
    this.notificationSrv.info(titleName, msg,{
      nzDuration: lifeNum
    });
  }

  public putWarnMsg(msg: string, titleName = '警告', lifeNum = 2500): void {
    this.notificationSrv.warning(titleName, msg,{
      nzDuration: lifeNum
    });
  }

  public putSuccessMsg(msg: string, titleName = '成功', lifeNum = 2000): void {
    this.notificationSrv.success(titleName, msg,{
      nzDuration: lifeNum
    });
  }

  public putErrorMsg(msg: string, titleName = '错误', lifeNum = 3000): void {
    this.notificationSrv.error(titleName, msg,{
      nzDuration: lifeNum
    });
  }
}
