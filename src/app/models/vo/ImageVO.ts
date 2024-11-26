export class ImageVO {
  imageId!: number;
  imageName!: string;
  imageType!: string;
  imageHttpUrl?: string;
  imageSummary!: string;
  createTime!: string;
  updateTime!: string;
  selected = false;
}
