export class IPageQueryItem {
  // 页数 start 1
  startIndex!: number;
  size!: number;
  orderKey!: string;
  searchKey!: string;
  filterKey!: string;


  constructor(startIndex: number, size: number) {
    this.startIndex = startIndex;
    this.size = size;
  }
}
