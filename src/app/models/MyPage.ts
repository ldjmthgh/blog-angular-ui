export class MyPage<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  orders: OrderItem[];
  optimizeCountSql: boolean;
  isSearchCount: boolean;
  hitCount: boolean;
  pages: number;


  constructor(records: T[], total: number, size: number, current: number, orders: OrderItem[], optimizeCountSql: boolean, isSearchCount: boolean, hitCount: boolean, pages: number) {
    this.records = records;
    this.total = total;
    this.size = size;
    this.current = current;
    this.orders = orders;
    this.optimizeCountSql = optimizeCountSql;
    this.isSearchCount = isSearchCount;
    this.hitCount = hitCount;
    this.pages = pages;
  }
}

export class OrderItem {
  column: string;
  asc: boolean;

  constructor(column: string, asc: boolean) {
    this.column = column;
    this.asc = asc;
  }
}
