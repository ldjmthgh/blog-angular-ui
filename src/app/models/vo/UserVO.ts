export class UserVO {
  userId!: number;
  /**
   * 用户名 唯一
   */
  userName!: string;
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

  createTime!: string;
  updateTime!: string;
}
