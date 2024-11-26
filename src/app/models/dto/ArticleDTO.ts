import {InputDisplayVO} from "../vo/InputDisplayVO";
import {isNullOrEmpty, isNullOrUndefined} from "../../common/StringUtil";

export class ArticleDTO {
  /**
   * 限定38个字
   */
  articleName!: string;
  /**
   * 文章简述 可为空
   */
  articleSummary!: string;
  /**
   * true ?  发布 : 草稿
   */
  published!: boolean;
}


export function articleNameCheck(articleName: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('文章名称限定1-38个字');
  }
  if (!isNullOrEmpty(articleName) && articleName.length > 1 && articleName.length < 39) {
    vo.passFlag = true;
    return vo;
  }

  vo.filterMsg = '文章名称限定1-38个字';
  vo.passFlag = false;
  return vo;
}


export function articleSummaryCheck(articleSummary: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('文章简述限定0-255个字符');
  }
  if (isNullOrEmpty(articleSummary) || articleSummary.length < 255) {
    vo.passFlag = true;
    return vo;
  }

  vo.filterMsg = '文章简述限定0-255个字符';
  vo.passFlag = false;
  return vo;
}
