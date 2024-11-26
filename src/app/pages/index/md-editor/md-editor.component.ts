import {Component, OnInit} from '@angular/core';
import {ArticleDTO, articleNameCheck, articleSummaryCheck} from "../../../models/dto/ArticleDTO";
import {ArticleVO} from "../../../models/vo/ArticleVO";
import Vditor from "vditor";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {MessageService} from "../../../services/message.service";
import {ArticleService} from "../../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "../../../common/StringUtil";
import {NzModalService} from "ng-zorro-antd/modal";
import {InputDisplayVO} from "../../../models/vo/InputDisplayVO";
import {ConfigService} from "../../../services/config.service";
import {UserDTO} from "../../../models/dto/UserDTO";

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.css']
})
export class MdEditorComponent implements OnInit {
  articleId!: number;
  initMdContent = '### 开始创作';
  dto: ArticleDTO = new ArticleDTO();
  vo = new ArticleVO();
  editor!: Vditor;
  file!: NzUploadFile;
  isSpinning = true;
  shouldSaveFlag = false;
  nextRouter: string = '/index';
  drawerVisible = false;

  articleNameDV: InputDisplayVO = new InputDisplayVO('文章名称限定1-38个字');
  articleSummaryDV: InputDisplayVO = new InputDisplayVO('文章简述限定0-255个字符');

  constructor(private msgSrv: MessageService,
              private articleSrv: ArticleService,
              private modal: NzModalService,
              private configSrv: ConfigService,
              private activatedRoute: ActivatedRoute,
              public router: Router) {
  }


  async ngOnInit() {
    await this.activatedRoute.queryParams.subscribe(queryParam => {
      if (null != queryParam && null != queryParam['id']) {
        this.articleId = queryParam['id'];
      }
    });
    if (!isNullOrUndefined(this.articleId)) {
      // 获取文章内容
      await this.articleSrv.getMdArticleContent(this.articleId).then(re => {
        if (re.code > 0) {
          this.initMdContent = re.data;
        } else {
          this.msgSrv.sendErrorMsg(re.msg);
        }
      });
      // 获取文章信息
      await this.articleSrv.select(this.articleId).then(re => {
        if (re.code > 0) {
          this.vo = re.data;
        } else {
          this.msgSrv.sendErrorMsg(re.msg);
        }
      });
    }
    const cdnIp = await this.configSrv.getCdnIp();
    this.editor = new Vditor('md-editor', {
      toolbarConfig: {
        pin: true,
      },
      cdn: cdnIp,
      cache: {
        enable: false,
      },
      value: this.initMdContent,
      after: () => {
        // 异步初始化操作完成
        this.isSpinning = false;
      },
      input: (value) => {
        this.shouldSaveFlag = true;
      }
    });
    // todo: 自动保存功能 难点 避免重复 冲突
  }

  // 修改基本信息
  updateBaseInfo() {
    this.dto.published = this.vo.published;
    this.dto.articleName = this.vo.articleName;
    this.dto.articleSummary = this.vo.articleSummary;
    this.drawerVisible = true;
  }

  async publish() {
    this.vo.published = !this.vo.published;
    await this.articleSrv.publish(this.vo.articleId).then(re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('更新成功');
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  // 保存文档内容
  async save() {
    if (!this.shouldSaveFlag) {
      this.msgSrv.sendInfoMsg('文档内容未发生变更');
      return;
    }
    await this.articleSrv.updateMdArticleContent(this.articleId, this.editor.getValue()).then(re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('文档保存成功');
        this.shouldSaveFlag = false;
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  // 返回首页
  async goBack() {
    await this.router.navigate(['/index']);
  }

  // 离开页面前保存
  saveWhileLeave() {
    this.modal.create({
      nzTitle: '警告',
      nzContent: '文档已发生变更，但未保存！是否保存？',
      nzClosable: false,
      nzOnOk: async () => {
        await this.save();
        await this.router.navigate([this.nextRouter]);
      }
    });
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  async update() {
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

    await this.articleSrv.update(this.vo.articleId, this.dto).then(re => {
      if (re.code > 0) {
        this.drawerVisible = false;
        this.msgSrv.sendSuccessMsg('更新成功');
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  checkArticleName = () => {
    this.articleNameDV = articleNameCheck(this.dto.articleName, this.articleNameDV);
  };

  checkArticleSummary = () => {
    this.articleSummaryDV = articleSummaryCheck(this.dto.articleSummary, this.articleSummaryDV);
  };
}
