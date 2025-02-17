import { useSyncExternalStore } from 'react';
import { combineReducers, createStore } from 'redux';

function numberReducer(state = 1, action: { type: string }) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'DEL':
            return state - 1;
        default:
            return state;
    }
}

/* 注册reducer */
const rootReducer = combineReducers({ number: numberReducer });
/* 创建 store */
const store = createStore(rootReducer, { number: 1 });

function Index() {
    /* 订阅外部数据源 */
    const state = useSyncExternalStore(store.subscribe, () => store.getState().number);
    console.log(state);
    return (
        <div>
            {state}
            <button onClick={() => store.dispatch({ type: 'ADD' })}>点击</button>
        </div>
    );
}

export default Index;