import { IndexApi } from './type';

export class Index {
  constructor(public indexApi: IndexApi) {
    let index = this.indexApi.getIndex();
    console.log(index);
  }
}
