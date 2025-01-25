// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import ReactDOMOLD from 'react-dom';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<div>React</div>);

// 方式一： 旧的方式渲染  会有警告  React17 之后就 支持新的方式 createRoot
// ReactDOMOLD.render(<div>React</div>, document.getElementById('root'));

// 方式二： 新的方式渲染 createRoot
// ReactDOMOLD.createRoot(document.getElementById('root')).render(<div>React</div>);


// 自定义实现
import React from './react-method/createElement';
import ReactDOM from './react-method/render-react-dom';

// 自己实现 createElement
// console.log(<div>React <p>11</p><p>22</p><p>33</p></div>)

// 实现函数组件渲染 - 自定义函数组件
function MyFunctionComponent () {
  return <div>
    React Function Component
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
  </div>
}

let MyFunctionComponent11 = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      React Function Component
      <p>p1</p>
      <p>p2</p>
      <p>p3</p>
    </div>
  )
})
let result = <MyFunctionComponent11 />
console.log(result, 'result')

// 实现类组件渲染 - 自定义类组件
class MyClassComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Lucky1111',
      count : '1'
    }
  }

  updateText() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    return <div>
      React Class Component
      <p>{ this.state.name }</p>
      <p>p2</p>
      <p onClick={() => this.updateText()}>点击触发事件</p>
      <p>{ this.state.count }dddd</p>
      <MyFunctionComponent />
    </div>
  }
}

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
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
        </div>
    );
  }
}

class MyClassComponent1 extends React.Component {
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

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
        <CustomTextInput ref={this.textInput} />
    );
  }
}

// 自己实现 render
ReactDOM.render(<MyFunctionComponent />, document.getElementById('root'));
