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

// 实现类组件渲染 - 自定义类组件
class MyClassComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Lucky1111',
    }
  }

  render () {
    return <div>
      React Class Component
      <p>{ this.state.name }</p>
      <p>p2</p>
      <p>p3</p>
      <MyFunctionComponent />
    </div>
  }
}

// 自己实现 render
ReactDOM.render(<MyClassComponent />, document.getElementById('root'));
