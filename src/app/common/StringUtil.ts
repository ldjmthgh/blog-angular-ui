export class StringUtil {

}

/**
 * 对象是否为null 或 undefine
 * @param object 被检测对象
 */
export function isNullOrUndefined(object: any): boolean {
  return undefined === object || null === object;
}

/**
 * 默认对象为str 检测是否为null 或 length == 0
 * @param str
 */
export function isNullOrEmpty(str: string): boolean {
  return isNullOrUndefined(str) || 0 === str.trim().length;
}

/**
 * 正则检测字符串，并核验长度
 * @param start 最小长度
 * @param end   最大长度
 * @param pattern  正则匹配
 * @param target   检测目标
 */
export function regexWithLength(start: number, end: number, pattern: string, target: string): boolean {
  if (start > end) {
    return false;
  }
  if (start == 0 && isNullOrEmpty(target)) {
    return true;
  }
  if (start != 0 && isNullOrEmpty(target)) {
    return false;
  }
  if (target.length < start || target.length > end) {
    return false;
  }
  return new RegExp(pattern).test(target);
}

/**
 * 正则检测字符串
 * @param pattern  正则匹配
 * @param target   检测目标
 */
export function justRegex(pattern: string, target: string): boolean {
  return new RegExp(pattern).test(target);
}

/**
 * 字母开头
 * @param str 检测对象
 */
export function startWithString(str: string): boolean {
  if (isNullOrEmpty(str)) {
    return false;
  }
  return new RegExp(/^[a-zA-Z]+.*$/).test(str);
}

/**
 * 是否包含字母
 * @param str 检查对象
 */
export function containStr(str: string): boolean {
  if (isNullOrEmpty(str)) {
    return false;
  }
  return new RegExp(/^.*[a-zA-Z]+.*$/).test(str);
}


/**
 * 是否包含数字
 * @param str 检查对象
 */
export function containNumber(str: string): boolean {
  if (isNullOrEmpty(str)) {
    return false;
  }
  return new RegExp(/^.*[0-9]+.*$/).test(str);
}

/**
 * 是否包含特殊符号
 * @param str 检查对象
 */
export function containSpecialChar(str: string): boolean {
  if (isNullOrEmpty(str)) {
    return false;
  }
  return new RegExp(/^\\W$/).test(str);
}

/**
 * 判断是否为允许的图片类型
 * @param fileName 文件名
 */
export function isImageType(fileName: string): boolean {
  if (isNullOrEmpty(fileName) || !fileName.includes(".")) {
    return false;
  }
  const strArr = fileName.split('.');
  const type = strArr[strArr.length - 1].trim();
  const imageTypeArr = ['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG', 'bmp', 'BMP', 'jpeg', 'JPEG'];
  for (const item of imageTypeArr) {
    if (type.toLocaleLowerCase() === item.toLocaleLowerCase()) {
      return true;
    }
  }
  return false;
}

/**
 * 转换图片文件未base64
 * @param file 图片文件
 */
export function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
