import {Component, OnInit, TemplateRef} from '@angular/core';
import {UserVO} from "../../../../models/vo/UserVO";
import {MessageService} from "../../../../services/message.service";
import {UserService} from "../../../../services/user.service";
import {isNullOrEmpty, isNullOrUndefined, justRegex} from "../../../../common/StringUtil";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  user = new UserVO();
  avatarFile!: NzUploadFile;
  zipFile!: NzUploadFile;
  zipFileUploadFlag = false;
  uploadFileFlag = false;

  userNameDisFlag = true;
  nickNameDisFlag = true;

  userName = '';
  nickName = '';


  constructor(public msgSrv: MessageService,
              private modal: NzModalService,
              private router: Router,
              private userSrv: UserService) {
  }

  async ngOnInit() {
    await this.initUser();
  }

  async initUser() {
    // 初始化用户信息
    await this.userSrv.getUserInfo().then(async re => {
      if (null !== re && re.code > 0) {
        this.user = re.data;
        if (isNullOrUndefined(this.user)) {
          this.user = new UserVO();
        }
        if (isNullOrEmpty(this.user.avatarHttpUrl)) {
          this.user.avatarHttpUrl = 'assets/img/avatar.png';
        }
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
    await this.userSrv.getChangeAvatarUrl(this.user.userId).then(re => {
      this.user.avatarHttpUrl = re;
    });
    this.userName = this.user.userName;
    this.nickName = this.user.nickName;
  }

  changeAvatar(tplContent: TemplateRef<{}>) {
    this.uploadFileFlag = false;
    this.modal.create({
      nzTitle: '替换头像',
      nzContent: tplContent,
      nzClosable: false,
      nzOnOk: async () => {
        if (this.uploadFileFlag) {
          const data = new FormData();
          // @ts-ignore
          data.append('file', this.avatarFile);
          await this.userSrv.changeAvatar(data).then(async re => {
            if (re.code > 0) {
              this.msgSrv.sendSuccessMsg('替换头像成功');
              window.location.reload();
            } else {
              this.msgSrv.sendErrorMsg(re.msg);
            }
          });
        }
      }
    });
  }

  beforeAvatarFileUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    this.avatarFile = file;
    this.uploadFileFlag = true;
    return false;
  };

  beforeZipFileUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): boolean => {
    this.zipFile = file;
    this.zipFileUploadFlag = true;
    return false;
  };

  async mvToResetEmailPage() {
    await this.router.navigate(['/index/selfCenter/resetEmail']);
  }

  async changeUserName() {
    if (this.userName === this.user.userName) {
      this.msgSrv.sendInfoMsg('值未发生变化');
      return;
    }
    if (justRegex('^[a-zA-Z][a-zA-Z_0-9]{2,15}$', this.user.userName)) {
      await this.userSrv.changeUserName(this.user.userName).then(re => {
        if (re.code > 0) {
          this.msgSrv.sendSuccessMsg('保存成功');
          this.userName = this.user.userName;
        } else {
          this.msgSrv.sendErrorMsg(re.msg);
        }
      });
    }
  }

  async changeNickName() {
    if (this.nickName === this.user.nickName) {
      this.msgSrv.sendInfoMsg('值未发生变化');
      return;
    }
    if (justRegex('^.{3,18}$', this.user.nickName)) {
      await this.userSrv.changeNickName(this.user.nickName).then(re => {
        if (re.code > 0) {
          this.msgSrv.sendSuccessMsg('保存成功');
          this.nickName = this.user.nickName;
        } else {
          this.msgSrv.sendErrorMsg(re.msg);
        }
      });
    }
  }

  async backup() {
    await this.userSrv.backup().then(re => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(re);
      a.href = objectUrl;
      a.download = 'blog.zip';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  async recovery(tplContent: TemplateRef<{}>) {
    this.modal.create({
      nzTitle: '恢复数据',
      nzContent: tplContent,
      nzClosable: false,
      nzOnOk: async () => {
        if (this.zipFileUploadFlag) {
          const data = new FormData();
          // @ts-ignore
          data.append('file', this.zipFile);
          await this.userSrv.recovery(data).then(async re => {
            if (re.code > 0) {
              this.msgSrv.sendSuccessMsg('恢复数据成功');
            } else {
              this.msgSrv.sendErrorMsg(re.msg);
            }
          });
        }
      }
    });
  }
}
