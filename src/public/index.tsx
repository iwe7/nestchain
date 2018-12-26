import { createElement, Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
export interface IGetOs {
  arch?: string;
  hostname?: string;
  platform?: string;
  uptime?: number;
  type?: string;
  freemem?: number;
  tmpdir?: string;
  totalmem?: number;
  release?: string;
  homedir?: string;
  cpus?: any[];
}
export class AppIndex extends Component<any, IGetOs> {
  state: IGetOs = {
    cpus: [],
  };
  async componentDidMount() {
    let res: any = await axios.get('/install/getOs');
    this.setState(res.data);
  }
  render() {
    let {
      arch,
      hostname,
      platform,
      uptime,
      type,
      freemem,
      tmpdir,
      totalmem,
      release,
      homedir,
      cpus,
    } = this.state;
    return (
      <div>
        首页
        <table>
          <thead />
          <tbody>
            <tr>
              <td>CPU 架构</td>
              <td>{arch}</td>
            </tr>
            <tr>
              <td>主机名</td>
              <td>{hostname}</td>
            </tr>
            <tr>
              <td>操作系统类型</td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>操作系统名</td>
              <td>{platform}</td>
            </tr>
            <tr>
              <td>发行版本</td>
              <td>{release}</td>
            </tr>
            <tr>
              <td>运行时间</td>
              <td>{uptime}秒</td>
            </tr>
            <tr>
              <td>总内存</td>
              <td>{totalmem}</td>
            </tr>
            <tr>
              <td>可用内存</td>
              <td>{freemem}</td>
            </tr>
            <tr>
              <td>临时目录</td>
              <td>{tmpdir}</td>
            </tr>
            <tr>
              <td>主目录</td>
              <td>{homedir}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            {cpus.map((cpu, key) => {
              return (
                <tr key={key}>
                  <td>{cpu.model}</td>
                  <td>{cpu.speed}</td>
                  <td>{cpu.times.idle}</td>
                  <td>{cpu.times.irq}</td>
                  <td>{cpu.times.nice}</td>
                  <td>{cpu.times.sys}</td>
                  <td>{cpu.times.user}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
render(<AppIndex />, document.getElementById('app'));
