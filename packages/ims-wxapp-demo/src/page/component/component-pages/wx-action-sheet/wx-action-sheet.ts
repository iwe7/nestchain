import { Page, ImsPage } from 'ims-core';

@Page()
export class WxActionSheet extends ImsPage {
  data = {
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3', 'item4'],
  };
  actionSheetTap(e: any) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
    });
  }
  actionSheetChange(e: any) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
    });
  }
  clickItem1(e: any) {
    console.log('click item 1', e);
  }
  clickItem2(e: any) {
    console.log('click item2', e);
  }
  clickItem3(e: any) {
    console.log('click item3', e);
  }
  clickItem4(e: any) {
    console.log('click item4', e);
  }
}
