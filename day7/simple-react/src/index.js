// import React, {useMemo, useCallback, useState} from 'react';
// import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<div>React</div>);

// 方式一： 旧的方式渲染  会有警告  React17 之后就 支持新的方式 createRoot
// ReactDOMOLD.render(<div>React</div>, document.getElementById('root'));

// 方式二： 新的方式渲染 createRoot
// ReactDOMOLD.createRoot(document.getElementById('root')).render(<div>React</div>);


// 自定义实现
import React, { useState, useReducer, useEffect, useRef, useImperativeHandle, useMemo, useCallback } from './react-method/createElement';
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
    this.state = {
      arr: this.oldArr,
      date: new Date()
    };

  }
  updateShowArr(){
    this.setState({
      arr: this.isReset ? this.oldArr : this.newArr
    })
    this.isReset = !this.isReset
  }

  // 首次渲染
  componentDidMount(){
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
    console.log('componentDidMount')
  }

  // 更新
  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  // 优化 shouldComponentUpdate
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return false
  }

  tick() {
    this.setState({
      date: new Date()
    });
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
      } onClick={ () => this.updateShowArr() }>Change The Text {this.state.date.toLocaleTimeString()}</div>
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

// getDerivedStateFromProps 用例
class ParentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: 'init'
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props, state)
  }

  changeValue = () => {
    this.setState({
      init: 'change'
    })
  }

  render() {
    return <div>
      <input type='button' value="点击" onClick={() => this.changeValue()} />
      <ChildClass count={this.state.init} />
    </div>
  }
}
class ChildClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return <div>
      <div>ChildClass</div>
      <div>count: {this.props.count}</div>
    </div>
  }
}

// getSnapshotBeforeUpdate 用例
class ScrollingList extends React.Component {
  counter = 0
  isAppend = true
  intervalId = 0
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {list: []}
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.list.length < this.state.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  appendData = () => {
    if(this.isAppend){
      this.intervalId = setInterval(()=>{
        this.setState({
          list: [...this.state.list, this.counter++]
        })
      },1000)
    }else{
      clearInterval(this.intervalId)
    }
    this.isAppend = !this.isAppend
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return (<div>
          <input type="button" onClick={()=>this.appendData()}  value={"追加/暂停追加数据"}/>
          <div  ref={this.listRef} style={{overflow: 'auto', height:'400px', background: '#efefef'}}>
            {
              this.state.list.map(item => {
                return <div key={item} style={{
                  height: '60px',
                  padding: '10px',
                  marginTop: '10px',
                  border: '1px solid blue',
                  borderRadius: '6px'
                }}>{item}</div>
              })
            }
          </div>

        </div>
    );
  }
}

// PureComponent 用例
class Greeting1 extends React.PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{this.props.name && ', '}{this.props.name}!</h3>;
  }
}

const Greeting = React.memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});

class MyApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {name: '', address: ''}
  }

  setName = (newName) => {
    this.setState({name: newName})
  }
  setAddress = (newAddress) => {
    this.setState({address: newAddress})
  }
  render(){
    return <div>
      <label>
        Name{': '}
        <input onInput={e => {
          this.setName(e.target.value)
        }} />
      </label>
      <label>
        Address{': '}
        <input onInput={e => {
          this.setAddress(e.target.value)
        }} />
      </label>
      <Greeting name={this.state.name} />
    </div>
  };
}

// useState 用例 及实现
function MyFunctionComponent1() {
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    setCount(count + 1)
  }

  return (
      <div>
        <h1>Number:___ { count }</h1>
        <button onClick={handleAdd}>点击增加</button>
      </div>
  )
}

// useReducer 用例 及实现
function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (<div>
    <button
      onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}
    >
      Increment age
    </button>
    <p>Hello! You are {state.age}.</p>
  </div>);
}

// useEffect 用例 及实现
export function createConnection(serverUrl, roomId) {
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
      <div>
        <label>
          Server URL:{' '}
          <input
              value={serverUrl}
              onInput={e => setServerUrl(e.target.value)}
          />
        </label>
        <h1>Welcome to the {roomId} room!</h1>
      </div>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
      <div>
        <label>
          Choose the chat room:{' '}
          <select
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
          >
            <option value="general">general</option>
            <option value="travel">travel</option>
            <option value="music">music</option>
          </select>
        </label>
        <button onClick={() => setShow(!show)}>
          {show ? 'Close chat' : 'Open chat'}
        </button>
        {show && <hr />}
        {show && <ChatRoom roomId={roomId} />}
      </div>
  );
}

// useRef 用例 及实现
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const handleClick = () => {
    inputEl.current.focus();
  }
  return <div>
    <input ref={inputEl} type="text" />
    <button onClick={handleClick}>Focus the input</button>
  </div>
}

// useImperativeHandle 用例 及实现
const MyInput = React.forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);
  // 暴露给父组件的方法
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current.focus();
      },
      getValue: () => {
        return inputRef.current.value = 'Hello, world!';
      }
    }
  })
  return <input {...props} ref={inputRef} />
})
function ImperativeHandleTest() {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
    ref.current.getValue();
  }
  return <div>
    <MyInput label={"Enter your name"} ref={ref} type="text" />
    <button onClick={handleClick}>Focus the input</button>
  </div>
}

// useMemo useCallback 用例 及实现
function MemoCom () {
  console.log('父组件渲染')
  const [name, setName] = useState('jack');
  const [age, setAge] = useState(18);

  const data = useMemo(() => {
    return { age }
  }, [age])

  const handleClick = useCallback(() => {
    setAge(age + 1);
  }, [age])

  return <div>
    <h1>年龄:___ { age } 名字:___ { name }</h1>
    input: <input type="text" value={name} onChange={e => setName(e.target.value)} />
    <MemoFunctionComponent data={data} handleClick={handleClick} />
  </div>
}

const MemoFunctionComponent =  React.memo(function MemoChild (props) {
  console.log('子组件渲染')
  return <div>
    <button onClick={props.handleClick}>点击增加{props.data.age}</button>
  </div>
})


// 自己实现 render
ReactDOM.render(<MemoCom />, document.getElementById('root'));
