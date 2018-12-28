import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'help',
  alias: 'h',
})
export class AddCommand {
  @Option({
    flags: 'p',
  })
  path: string;

  @Action()
  add() {
    console.log(`
| 完整命令      | 简写     | 简介   | 状态 |
|-----------|--------|------|----|
| start     | start  | 启动服务 | ✗  |
| version   | v      | 版本号  | ✗  |
| help      | h      | 帮助   | ✗  |
| generator | g      | 模板   | ✗  |
| build     | build  | 构建   | ✗  |
| add       | add    | 添加文件 | ✗  |
| commit    | commit | 备注   | ✗  |
| pull      | pull   | 同步   | ✗  |
| push      | push   | 发布   | ✗  |
`);
  }
}
