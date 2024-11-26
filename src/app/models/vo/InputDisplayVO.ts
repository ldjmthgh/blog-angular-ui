export class InputDisplayVO {
  // input输入不符合规范的点
  filterMsg: string;
  // 是否通过检测  默认初始为通过检测
  passFlag = true;
  // 是否会被展示 默认初始不展示
  showFlag = false;

  constructor(filterMsg: string) {
    this.filterMsg = filterMsg;
  }
}
