import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {ArticleDTO, articleNameCheck, articleSummaryCheck} from "../../../models/dto/ArticleDTO";
import {ImageDTO, imageNameCheck, imageSummaryCheck} from "../../../models/dto/ImageDTO";
import {InputDisplayVO} from "../../../models/vo/InputDisplayVO";
import {ArticleService} from "../../../services/article.service";
import {ImageService} from "../../../services/image.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NavIcon} from "../../../models/NavIcon";
import {isImageType, isNullOrEmpty, isNullOrUndefined} from "../../../common/StringUtil";
import {Router} from "@angular/router";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-md-nav',
  templateUrl: './md-nav.component.html',
  styleUrls: ['./md-nav.component.css']
})
export class MdNavComponent implements OnInit {
  mdArticleFlag = true;
  file!: NzUploadFile;
  uploadFileFlag = false;

  article = new ArticleDTO();
  image = new ImageDTO();


  articleNameDV: InputDisplayVO = new InputDisplayVO('文章名称限定1-38个字');
  articleSummaryDV: InputDisplayVO = new InputDisplayVO('文章简述限定0-255个字符');

  imageNameDV: InputDisplayVO = new InputDisplayVO('图片名称限定1-16个字符');
  imageSummaryDV: InputDisplayVO = new InputDisplayVO('图片简述限定0-25个字符');


  constructor(private articleSrv: ArticleService,
              private modal: NzModalService,
              public msgSrv: MessageService,
              private router: Router,
              private imageSrv: ImageService,) {
  }

  async ngOnInit() {
    this.article.published = false;
  }

  beforeIndexFileUpload = (file: NzUploadFile): boolean => {
    this.file = file;
    if (this.file.name.endsWith('.md')) {
      this.mdArticleFlag = true;
      this.uploadFileFlag = true;
      if (!isNullOrEmpty(this.file.name)) {
        const index = this.file.name.lastIndexOf('.');
        if (index > 0) {
          this.article.articleName = this.file.name.substr(0, index);
        }
      }
    } else if (isImageType(this.file.name)) {
      if (!isNullOrEmpty(this.file.name)) {
        const index = this.file.name.lastIndexOf('.');
        if (index > 0) {
          this.image.imageName = this.file.name.substr(0, index);
        }
      }
      this.mdArticleFlag = false;
      this.uploadFileFlag = true;
    } else {
      this.msgSrv.sendInfoMsg('请上传.md格式的文档或图片');
    }
    return false;
  };


  uploadDialogOpen(tplContent: TemplateRef<{}>, articleContent: TemplateRef<{}>, imageContent: TemplateRef<{}>) {
    this.uploadFileFlag = false;
    this.article = new ArticleDTO();
    this.article.published = false;
    this.image = new ImageDTO();
    this.modal.create({
      nzTitle: '上传文件',
      nzContent: tplContent,
      nzClosable: false,
      nzOnOk: () => {
        if (this.mdArticleFlag) {
          this.articleFormDialogOpen(articleContent);
        } else {
          this.imageFormDialogOpen(imageContent);
        }
      }
    });
  }

  articleFormDialogOpen(tplContent: TemplateRef<{}>) {
    this.modal.create({
      nzTitle: '上传MD文档',
      nzContent: tplContent,
      nzClosable: false,
      nzOnOk: async () => this.articleFormSubmit()
    });
  }

  imageFormDialogOpen(tplContent: TemplateRef<{}>) {
    this.modal.create({
      nzTitle: '上传MD图片',
      nzContent: tplContent,
      nzClosable: false,
      nzOnOk: async () => this.imageFormSubmit()
    });
  }

  async articleFormSubmit() {
    this.checkArticleName();
    this.checkArticleSummary();
    if (!this.articleNameDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.articleNameDV.filterMsg);
      return;
    }
    if (!this.articleSummaryDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.articleSummaryDV.filterMsg);
      return;
    }
    await this.articleSrv.insert(this.article).then(async re => {
      if (re.code > 0) {
        const data = new FormData();
        // @ts-ignore
        data.append('file', this.file);
        await this.articleSrv.upload(re.data, data).then(res => {
          if (res.code > 0) {
            this.msgSrv.sendSuccessMsg('MD 文档上传成功');
            window.location.reload();
          } else {
            this.msgSrv.sendErrorMsg(res.msg);
          }
        });
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });

  }

  async imageFormSubmit() {
    this.checkImageName();
    this.checkImageSummary();
    if (!this.imageNameDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.imageNameDV.filterMsg);
      return;
    }

    if (!this.imageSummaryDV.passFlag) {
      this.msgSrv.sendInfoMsg(this.imageSummaryDV.filterMsg);
      return;
    }
    await this.imageSrv.insert(this.image).then(async re => {
      if (re.code > 0) {
        const data = new FormData();
        // @ts-ignore
        data.append('file', this.file);
        await this.imageSrv.upload(re.data, data).then(res => {
          if (res.code > 0) {
            this.msgSrv.sendSuccessMsg('MD 图片上传成功');
            window.location.reload();
          } else {
            this.msgSrv.sendErrorMsg(res.msg);
          }
        });
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }


  checkArticleName = () => {
    this.articleNameDV = articleNameCheck(this.article.articleName, this.articleNameDV);
  };

  checkArticleSummary = () => {
    this.articleSummaryDV = articleSummaryCheck(this.article.articleSummary, this.articleSummaryDV);
  };

  checkImageName = () => {
    this.imageNameDV = imageNameCheck(this.image.imageName, this.imageNameDV);
  };

  checkImageSummary = () => {
    this.imageSummaryDV = imageSummaryCheck(this.image.imageSummary, this.imageSummaryDV);
  };


}
