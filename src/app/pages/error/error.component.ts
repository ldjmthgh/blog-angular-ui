import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private msgSrv: MessageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  goBack() : void {
    // TODO: 完成后 跳转到 展示首页
    this.router.navigate(['/index']).then(re => {
      if (!re) {
        this.msgSrv.sendErrorMsg('登录成功，但服务暂不可用！请联系管理员或稍后访问！');
      }
    });
  }

}
