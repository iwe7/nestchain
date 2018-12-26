import { createElement, Component } from 'react';
import { render } from 'react-dom';

export class AppIndex extends Component<any, any> {
  render() {
    return <div>首页</div>;
  }
}
render(<AppIndex />, document.getElementById('app'));
