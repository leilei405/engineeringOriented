/**
 * 模拟 React 基类
 */
export class Component {
  static IS_CLASS_COMPONENT = true
  constructor(props) {
    this.props = props;
    this.state = {};
  }
}