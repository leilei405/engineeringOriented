import { emitUpdateForHooks } from "../react-method/render-react-dom";
let states = [];
let hookIndex = 0;

export function resetHookIndex() {
  hookIndex = 0;
}

export function useState(initialState) {
  states[hookIndex] = states[hookIndex] || initialState;
  const currentIndex = hookIndex;
  function setState(newState) {
    states[currentIndex] = newState;
    emitUpdateForHooks();
  }
  return [states[hookIndex++], setState];
}
