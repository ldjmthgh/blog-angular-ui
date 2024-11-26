import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message.service";
import {ArticleService} from "../../../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "../../../common/StringUtil";
import Vditor from "vditor";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-md-viewer',
  templateUrl: './md-viewer.component.html',
  styleUrls: ['./md-viewer.component.css']
})
export class MdViewerComponent implements OnInit {
  articleId!: number;
  isSpinning = true;
  initMdContent = '### 404 NOT FOUND';

  constructor(private msgSrv: MessageService,
              private articleSrv: ArticleService,
              private activatedRoute: ActivatedRoute,
              private configSrv: ConfigService,
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
      await this.originContentToMarkdown(this.initMdContent);
    }
  }

  async originContentToMarkdown(originContent: string) {
    const cdnIp = await this.configSrv.getCdnIp();
    const options = {
      mode: "dark",
      hljs: {style: "github"},
      cdn: cdnIp
    };
    // @ts-ignore
    await Vditor.preview(document.getElementById("viewer-editor") as HTMLDivElement, originContent, options);
    this.isSpinning = false;
  }

}
