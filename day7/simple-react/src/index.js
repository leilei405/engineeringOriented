// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<div>React</div>);

// 方式一： 旧的方式渲染  会有警告  React17 之后就 支持新的方式 createRoot
// ReactDOMOLD.render(<div>React</div>, document.getElementById('root'));

// 方式二： 新的方式渲染 createRoot
// ReactDOMOLD.createRoot(document.getElementById('root')).render(<div>React</div>);


// 自定义实现
import React from './react-method/createElement';
import ReactDOM from './react-method/render-react-dom';

// 实现函数组件渲染 - 自定义函数组件  纯展示
function MyFunctionComponent () {
  return <div>
    React Function Component
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
  </div>
}

// 实现函数组件渲染 - forwardRef 案例
let result = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      React Function Component
      <p>p1</p>
      <p>p2</p>
      <p>p3</p>
    </div>
  )
})
// let result = <MyFunctionComponentExample />
// console.log(result, 'result')

// 实现类组件渲染 - 自定义类组件  纯展示
class MyClassComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  render () {
    return <div>
      React Class Component
      <p>p1</p>
      <p>p2</p>
      <p>p3</p>
    </div>
  }
}

// 实现类组件渲染 - 自定义类组件 - 有状态 setState 更新
class MyClassComponentSetState extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count : 'init++'
    }
  }

  updateText(a) {
    this.setState({
      count: this.state.count
    })
  }

  render () {
    return <div>
      React Class Component
      <p>嘿嘿哈哈</p>
      <p>p2</p>
      <button onClick={() => this.updateText()}>点击触发更新 count 状态</button>
      <p>State 数据：{ this.state.count }</p>
    </div>
  }
}

// 官方使用 Ref ClassComponent 案例
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this); // 绑定 this 指向
    this.testRef = React.createRef();
  }

  focusTextInput() {
    this.textInput.current.focus();
    this.testRef.current.updateText(100);
  }

  render() {
    return (
        <div>
          <input
              type="text"
              ref={this.textInput} />
          <input
              type="button"
              value="Focus the text input"
              onClick={this.focusTextInput}
          />
          <MyClassComponentSetState ref={this.testRef} />
        </div>
    );
  }
}

// Diff 算法调试
class MyClassComponentDiff extends React.Component{
  isReset = false
  oldArr = ['A', 'B', 'C', 'D', 'E']
  newArr = ['C', 'B', 'E', 'F', 'A']
  constructor(props) {
    super(props);
    this.state = { arr: this.oldArr };
  }
  updateShowArr(){
    this.setState({
      arr: this.isReset ? this.oldArr : this.newArr
    })
    this.isReset = !this.isReset
  }

  // 首次渲染
  componentDidMount(){
    console.log('componentDidMount')
  }

  // 更新
  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  render(){
    return <div>
      <div className='test-class'
           style={
        {
          color: 'red',
          cursor: 'pointer',
          border: '1px solid gray',
          borderRadius: '6px',
          display: 'inline-block',
          padding: '6px 12px'
        }
      } onClick={ () => this.updateShowArr() }>Change The Text</div>
      <div>
        {
          this.state.arr.map(item => {
            return <div key={item}>{item}</div>
          })
        }
      </div>
    </div>
  }
}

// 自己实现 render
ReactDOM.render(<MyClassComponentDiff />, document.getElementById('root'));
