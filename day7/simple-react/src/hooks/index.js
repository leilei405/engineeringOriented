import { emitUpdateForHooks } from "../react-method/render-react-dom";
let states = [];
let hookIndex = 0;

// 重置 hookIndex
export function resetHookIndex() {
  hookIndex = 0;
}

// useState
export function useState(initialState) {
  states[hookIndex] = states[hookIndex] || initialState;
  const currentIndex = hookIndex;
  function setState(newState) {
    states[currentIndex] = newState;
    emitUpdateForHooks();
  }
  return [states[hookIndex++], setState];
}

// useReducer
export function useReducer(reducer, initValue) {
  states[hookIndex] = states[hookIndex] || initValue;
  const currentIndex = hookIndex;
  function dispatch(action) {
    states[currentIndex] = reducer(states[currentIndex], action);
    emitUpdateForHooks();
  }
  return [states[hookIndex++], dispatch];
}

// useEffect
export function useEffect(callback, deps = []) {
  const currentIndex = hookIndex;
  const [destroyFunction, preDeps] = states[hookIndex] || [null, null];
  if (!states[hookIndex] || deps.some((item, index) => item !== preDeps[index])) {
    // 宏任务队列
    setTimeout(() => {
      destroyFunction && destroyFunction();
      states[currentIndex] = [callback(), deps];
    }, 0);

  }
  hookIndex++;
}

// useLayoutEffect
export function useLayoutEffect(callback, deps = []) {
  const currentIndex = hookIndex;
  const [destroyFunction, preDeps] = states[hookIndex] || [null, null];
  if (!states[hookIndex] || deps.some((item, index) => item !== preDeps[index])) {
    // 微任务队列
    queueMicrotask(() => {
      destroyFunction && destroyFunction();
      states[currentIndex] = [callback(), deps];
    });
  }
  hookIndex++;
}

// useRef
export function useRef(initialValue) {
  const currentIndex = hookIndex;
  states[hookIndex] = states[hookIndex] || { current: initialValue }
  return states[hookIndex++];
}