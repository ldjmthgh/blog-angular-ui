import {InputDisplayVO} from "../vo/InputDisplayVO";
import {isNullOrEmpty, isNullOrUndefined} from "../../common/StringUtil";

export class ImageDTO {
  imageName!: string;
  imageType!: string;
  imageSummary!: string;
}

export function imageNameCheck(imageName: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('图片名称限定1-50个字符');
  }
  if (!isNullOrEmpty(imageName) && imageName.length > 1 && imageName.length < 51) {
    vo.passFlag = true;
    return vo;
  }

  vo.filterMsg = '图片名称限定1-50个字符';
  vo.passFlag = false;
  return vo;
}

export function imageSummaryCheck(imageSummary: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('图片简述限定1-25个字符');
  }
  if (isNullOrEmpty(imageSummary) || imageSummary.length < 25) {
    vo.passFlag = true;
    return vo;
  }

  vo.filterMsg = '图片简述限定0-25个字符';
  vo.passFlag = false;
  return vo;
}
