import { useContext, createContext } from 'react';

// 1. 创建上下文对象
const Context = createContext<{ name?: string; age?: number }>({});

/* 使用useContext方式 */
const DemoContext = () => {
    const value = useContext(Context);
    return <div> my name is {value.name}</div>;
}

/* 使用Context.Consumer方式 */
const DemoContext1 = () => {
    return (
        <Context.Consumer>
            {value => <div> my name is {value.name}</div>}
        </Context.Consumer>
    );
}

export default () => {
    return (
        <div>
            <Context.Provider value={{ name: 'alien', age: 18 }}>
                <DemoContext />
                <DemoContext1 />
            </Context.Provider>
        </div>
    );
}