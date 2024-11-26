import {Component, OnInit} from '@angular/core';
import {ArticleVO} from "../../../../models/vo/ArticleVO";
import {Router} from "@angular/router";
import {MessageService} from "../../../../services/message.service";
import {ArticleService} from "../../../../services/article.service";
import {IPageQueryItem} from "../../../../models/IPageQueryItem";
import {isNullOrUndefined} from "../../../../common/StringUtil";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-md-article',
  templateUrl: './md-article.component.html',
  styleUrls: ['./md-article.component.css']
})
export class MdArticleComponent implements OnInit {
  articleList: ArticleVO[] = []; // 后端分页
  totalSize: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  searchKey = '';
  queryItem = new IPageQueryItem(1, 10);

  constructor(public router: Router,
              private articleSrv: ArticleService,
              public msgSrv: MessageService) {
  }

  async ngOnInit() {
    await this.getArticlePageData();
  }

  async pageEvent(event: NzTableQueryParams) {
    this.queryItem.startIndex = event.pageIndex;
    await this.getArticlePageData();
  }

  searchPage = async () => {
    this.queryItem.searchKey = this.searchKey;
    await this.getArticlePageData();
  };

  async getArticlePageData() {
    await this.articleSrv.getPageList(this.queryItem).then((re) => {
      if (!isNullOrUndefined(re) && re.code > 0) {
        this.articleList = re.data.records;
        this.totalSize = re.data.total;
      } else {
        this.msgSrv.sendErrorMsg(re.msg);
      }
    });
  }

  async viewArticle(vo: ArticleVO) {
    await this.router.navigate(['/index/mdViewer'], {queryParams: {id: vo.articleId}});
  }

  async mvToEditor(vo: ArticleVO) {
    await this.router.navigate(['/index/mdEditor'], {queryParams: {id: vo.articleId}});
  }

  async removeArticle(vo: ArticleVO) {
    const ids = [];
    ids.push(vo.articleId);
    this.articleSrv.removeBatch(JSON.stringify(ids)).then(async re => {
      if (re.code > 0) {
        this.msgSrv.sendSuccessMsg('文档已移入回收站');
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
    this.getArticlePageData();
  }
}
