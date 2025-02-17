import SyncExternalStoreCom from './study/redux'
import TransitionUseCom from './study/useTransition'
import DeferredValueUseCom from './study/useDeferredValue'
function App() {
  return (
      <div>
          <h1>Hello React</h1>
          <h2>SyncExternalStoreCom</h2>
          <SyncExternalStoreCom/>
          <h2>TransitionUseCom</h2>
          <TransitionUseCom/>
          <h2>DeferredValueUseCom</h2>
          <DeferredValueUseCom />
      </div>
  )
}

export default App
