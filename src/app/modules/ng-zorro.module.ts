import {NgModule} from '@angular/core';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCascaderModule} from "ng-zorro-antd/cascader";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {NzTreeModule} from "ng-zorro-antd/tree";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzListModule} from "ng-zorro-antd/list";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {IconDefinition} from "@ant-design/icons-angular";
import {
  AccountBookFill,
  AlertFill,
  AlertOutline, DeleteOutline,
  EyeInvisibleOutline,
  InboxOutline, PictureTwoTone,
  PlusOutline,
  UserOutline
} from "@ant-design/icons-angular/icons";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzBackTopModule} from "ng-zorro-antd/back-top";

const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  InboxOutline,
  UserOutline,
  EyeInvisibleOutline,
  PlusOutline,
  DeleteOutline,
  PictureTwoTone,
];

@NgModule({
  declarations: [],
  imports: [
    NzAvatarModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzListModule,
    NzIconModule.forRoot(icons),
    NzImageModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzTagModule,
    NzTableModule,
    NzTabsModule,
    NzToolTipModule,
    NzTreeSelectModule,
    NzTreeModule,
    NzTypographyModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzSwitchModule,
    NzUploadModule,
  ],
  exports: [
    NzAvatarModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzListModule,
    NzIconModule,
    NzImageModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzTagModule,
    NzTableModule,
    NzTabsModule,
    NzTreeSelectModule,
    NzTreeModule,
    NzToolTipModule,
    NzTypographyModule,
    NzSelectModule,
    NzSpinModule,
    NzStepsModule,
    NzSwitchModule,
    NzUploadModule,
  ]
})
export class NgZorroModule {
}
