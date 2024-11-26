import {InputDisplayVO} from "../vo/InputDisplayVO";
import {
  containNumber,
  containSpecialChar,
  containStr,
  isNullOrEmpty,
  isNullOrUndefined,
  justRegex,
  startWithString
} from "../../common/StringUtil";

export class UserDTO {
  /**
   * 用户名 唯一
   */
  userName!: string;
  /**
   * 密码  不对称加密后入库
   */
  userPassword!: string;
  /**
   * 头像地址
   */
  avatarHttpUrl!: string;
  /**
   * 用户昵称  长度1-16
   */
  nickName!: string;
  /**
   * 用户email 可用于召回密码
   */
  email!: string;
}

// 校验用户名
export function userNameCheck(userName: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    // 默认第一次校验
    vo = new InputDisplayVO('3-16个字符，允许字母、数字、下划线，需以字母开头');
  }
  if (justRegex('^[a-zA-Z][a-zA-Z_0-9]{2,15}$', userName)) {
    vo.passFlag = true;
    return vo;
  }
  if (isNullOrEmpty(userName) || userName.length < 3 || userName.length > 16) {
    vo.filterMsg = '用户名限3-16个字符';
    vo.passFlag = false;
    return vo;
  }
  if (!startWithString(userName)) {
    vo.filterMsg = '需要字母开头';
    vo.passFlag = false;
    return vo;
  }
  vo.filterMsg = '仅允许字母、数字、下划线';
  vo.passFlag = false;
  return vo;
}

// 校验密码格式
export function userPwdCheck(pwd: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('8-16个字符，允许字母、数字、特殊字符，至少包含一个字母、数字和特殊符号');
  }
  if (justRegex('^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\\W]+$)(?![a-zA-Z\\W]+$)[0-9A-Za-z\\W]{8,16}$', pwd)) {
    vo.passFlag = true;
    return vo;
  }
  if (isNullOrEmpty(pwd) || pwd.length < 8 || pwd.length > 16) {
    vo.filterMsg = '密码限8-16个字符';
    vo.passFlag = false;
    return vo;
  }
  if (!containStr(pwd) || !containNumber(pwd) || !containSpecialChar(pwd)) {
    vo.filterMsg = '至少包含一个字母、数字和特殊符号';
    vo.passFlag = false;
    return vo;
  }

  vo.filterMsg = '仅允许字母、数字、特殊符号';
  vo.passFlag = false;
  return vo;
}

export function userSecPwdCheck(pwd: string, secPwd: string, vo: InputDisplayVO) {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('两次密码不一致');
  }

  if (!isNullOrEmpty(secPwd) && secPwd === pwd) {
    vo.passFlag = true;
    return vo;
  }
  vo.filterMsg = '两次密码不一致';
  vo.passFlag = false;
  return vo;
}

// 校验昵称
export function nickNameCheck(nickName: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('昵称限长3-18个字符');
  }
  if (justRegex('^.{3,18}$', nickName)) {
    vo.passFlag = true;
    return vo;
  }
  vo.filterMsg = '昵称长度限3-18个字符';
  vo.passFlag = false;
  return vo;
}

// 校验邮箱
export function emailCheck(userEmail: string, vo: InputDisplayVO): InputDisplayVO {
  if (isNullOrUndefined(vo)) {
    vo = new InputDisplayVO('限长28个字符，格式：******@****.com');
  }
  if (justRegex('^(\\w+([-.][A-Za-z0-9]+)*){3,18}@\\w+([-.][A-Za-z0-9]+)*\\.\\w+([-.][A-Za-z0-9]+)*$', userEmail)) {
    vo.passFlag = true;
    return vo;
  }
  if (isNullOrEmpty(userEmail) || userEmail.length > 28) {
    vo.filterMsg = '邮箱限28个字符';
    vo.passFlag = false;
    return vo;
  }
  vo.filterMsg = '邮箱格式：******@****.com';
  vo.passFlag = false;
  return vo;
}
