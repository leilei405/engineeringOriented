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
console.log(<div>React <p>11</p><p>22</p><p>33</p></div>)

// 自己实现 render
ReactDOM.render(<div>React Render</div>, document.getElementById('root'));
